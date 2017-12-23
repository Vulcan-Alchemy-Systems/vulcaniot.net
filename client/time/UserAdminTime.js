Template.UserAdminTime.onCreated(function() {
  this.autorun(() => {
    var userId = FlowRouter.getParam('id');
    this.subscribe('singleUserTime',userId);
  });
});

// rendered
Template.UserAdminTime.rendered = function(){
  var userId = FlowRouter.getParam('id');

  // record history
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'User Viewed Admin Time Clock'
  });
};

// helpers
Template.UserAdminTime.helpers({
  // get user Time
  getUserTimes: function() {
    var userId = FlowRouter.getParam('id');
    return Time.find({userId: userId},  {"sort" : [['created', 'desc']]}).fetch();
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
  'click .edit-time': function(event) {
      Session.set('TimeData', this);
      Session.set('EditTime', !Session.get('EditTime'));
  },
  'click .create-time': function(event) {
    Session.set('CreateTime', !Session.get('CreateTime'));
    console.log(Session.get('CreateTime'));
  },
  // open modal
  'click .delete-time': function(event) {
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

  // export
  'click .export-time': function(event) {
    var userId = FlowRouter.getParam('id');
    var nameFile = 'fileDownloaded.csv';
    Meteor.call('download', userId, function(err, fileContent) {
      if(fileContent){
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        saveAs(blob, nameFile);
      }
    });
  }
});
