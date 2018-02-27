// onCreated
Template.UserTimeWidget.onCreated(function() {
  this.autorun(() => {
    var userId = Session.get('UserId');
    // if no session id then get it from the param
    if(! userId) {
      var userId = FlowRouter.getParam('id');
    }
    this.subscribe('singleUserTime', userId);
  });
});

// onRendered
Template.UserTimeWidget.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();
});

// rendered
Template.UserTimeWidget.rendered = function() {

};

// helpers
Template.UserTimeWidget.helpers({
  // get user Time
  getUserTimes: function() {
    var userId = Session.get('UserId');
    // if no session id then get it from the param
    if(! userId) {
      var userId = FlowRouter.getParam('id');
    }

    var result = Session.get('UserTimes');

    // if no results from session then fetch from DB
    if(! result || result.length == 0) {
      var result = Time.find({
        userId: userId
      }, {
        "sort": [
          ['created', 'desc']
        ]
      }).fetch();
    }

    return result;
  },

  // rowClass
  rowClass: function(action) {
    if (action == 'In') {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }
});

// events
Template.UserTimeWidget.events({
  // time-edit
  'click .time-edit': function(event) {
    event.preventDefault();
    Session.set('TimeData', this);
    Session.set('EditTime', !Session.get('EditTime'));
  },

  // time-edit-submit
  'click .time-edit-submit': function(event) {
    event.preventDefault();
    var formData = AutoForm.getFormValues('updateTimeForm');
    var time = Session.get('TimeData');

    // call update
    Meteor.call('updateTime',
      time._id, formData.updateDoc,
      function(error) {
        if (error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Time entry was updated.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated time entry ' + time._id
          });

          // scrollTop
          $('body').scrollTop(0);

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function() {
            $("#alert").slideUp(500);
          });

          var userId = Session.get('UserId');
          var UserTimes = Time.find({
            userId: userId
          }, {
            "sort": [
              ['created', 'desc']
            ]
          }).fetch();

          Session.set('UserTimes', UserTimes);
          Session.set('EditTime', false);
        }
      });
  },

  // time-create
  'click .time-new': function(event) {
    event.preventDefault();
    Session.set('TimeNew', !Session.get('TimeNew'));
  },

  // time-print
  'click .time-print': function(event) {
    event.preventDefault();
    var userId = FlowRouter.getParam('id');
    var startDate = Session.get('startDate');
    var endDate = Session.get('endDate');
    window.open(FlowRouter.url('timePrint', {
      userId: userId
    }, {
      startDate: startDate,
      endDate: endDate
    }), '_blank');
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
      if (error) {
        console.log(error.message);
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        var userId = Session.get('UserId');
        var result = Time.find({
          userId: userId
        }, {
          "sort": [
            ['created', 'desc']
          ]
        }).fetch();
        Session.set('UserTimes', result);
        $('#myModal').modal('toggle');
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Time entry was removed.</div>');
      }
    });

    // scrollTop
    $('body').scrollTop(0);

    // auto dismiss
    $("#alert").fadeTo(2000, 500).slideUp(500, function() {
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
    var userId = Session.get('UserId');

    // if no session id then get it from the param
    if(! userId) {
      var userId = FlowRouter.getParam('id');
    }

    // set session for export and printing.
    Session.set('startDate', startDate);
    Session.set('endDate', endDate);

    Meteor.call('timeSearchDate', startDate, endDate, userId, function(error, result) {
      if (error) {
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
    $("#alert").fadeTo(2000, 500).slideUp(500, function() {
      $("#alert").slideUp(500);
    });
  },

  // export
  'click .time-export': function(event) {
    var userId = Session.get('UserId');
    var startDate = Session.get('startDate');
    var endDate = Session.get('endDate');
    var nameFile = 'fileDownloaded.csv';

    Meteor.call('download', userId, startDate, endDate, function(err, fileContent) {
      if (fileContent) {
        var blob = new Blob([fileContent], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob, nameFile);
      }
    });
  }
});
