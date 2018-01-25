Template.UserAdminTime.onCreated(function() {
  this.autorun(() => {
    var userId = FlowRouter.getParam('id');
    this.subscribe('singleUserTime',userId);
  });
});

// rendered
Template.UserAdminTime.rendered = function(){
  var userId = FlowRouter.getParam('id');

  Meteor.call('getUserTimes', userId, function(error, result) {
    if(error) {
        console.log(error.message);
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
    } else {
      console.log(result);
      Session.set('UserTimes', result);
    }
  });


  // record history
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'User Viewed Admin Time Clock'
  });
};


Template.UserAdminTime.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});


// helpers
Template.UserAdminTime.helpers({
  // get user Time
  getUserTimes: function() {
    return Session.get('UserTimes');
  },

  // date
  dateLongFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },

  // rowClass
  rowClass: function(action) {
    if(action == 'In') {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }
});

// events
Template.UserAdminTime.events({

  // time-edit
  'click .time-edit': function(event) {
      event.preventDefault();
      Session.set('TimeData', this);
      Session.set('EditTime', !Session.get('EditTime'));
  },

  // time-create
  'click .time-create': function(event) {
    event.preventDefault();
    Session.set('CreateTime', !Session.get('CreateTime'));
  },

  // time-print
  'click .time-print': function(event) {
    event.preventDefault();
    var userId = FlowRouter.getParam('id');
    var startDate = Session.get('startDate');
    var endDate = Session.get('endDate');
     window.open(FlowRouter.url('timePrint', {userId: userId}, {startDate: startDate, endDate: endDate}), '_blank');
  },

  // time-delete
  'click .time-delete': function(event) {
    event.preventDefault();
    $('#timeEntry').html(moment(this.created).format(Meteor.settings.public.longDate));
    $('#timeId').val(this._id);
    $('#myModal').modal('toggle')
  },

  // delete
  'click .do-delete-time': function(event) {
    event.preventDefault();
    var id = $('#timeId').val();

    // call delete
    Meteor.call('deleteTime', {
      id,
    }, function(error, result) {
      if(error) {
          console.log(error.message);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        console.log('deleted time: ' + id);
        $('#myModal').modal('toggle');
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Time entry was removed.</div>');
      }
    });

    // scrollTop
    $('body').scrollTop(0);

    // auto dismiss
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });
  },

  // time-report
  'click .time-report': function(event, instance) {
    event.preventDefault();

    $('#timeSearchModal').modal('toggle');
  },

  // time-do-search
  'click .time-do-search': function(event, instance) {
    event.preventDefault();

    var startDate = instance.$('#startDate').val();
    var endDate = instance.$('#endDate').val();
    var userId = instance.$('#userId').val();

    // set session for export and printing.
    Session.set('startDate',startDate);
    Session.set('endDate', endDate);

    userId = Meteor.userId();

    Meteor.call('timeSearchDate', startDate, endDate, userId, function(error, result) {

      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
          console.log(result);
          Session.set('UserTimes', result);
          $('#timeSearchModal').modal('toggle');
      }
    });

    // scrollTop
    $('body').scrollTop(0);

    // auto dismiss
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });
  },

  // export
  'click .time-export': function(event) {
    var userId = FlowRouter.getParam('id');
    var startDate = Session.get('startDate');
    var endDate = Session.get('endDate');
    var nameFile = 'fileDownloaded.csv';

    Meteor.call('download', userId, startDate, endDate, function(err, fileContent) {
      if(fileContent){
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        saveAs(blob, nameFile);
      }
    });
  }
});
