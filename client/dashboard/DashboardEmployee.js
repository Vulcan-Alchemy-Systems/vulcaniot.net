import Chart from 'chart.js';
// created
Template.DashboardEmployee.onCreated(function() {
  this.autorun(() => {
    this.subscribe('gasEvent', '/vulcan/scale/gas', 1);
  });
});

// rendered
Template.DashboardEmployee.rendered = function() {


};



// helpers
Template.DashboardEmployee.helpers({
  // is clocked in
  isClockedIn: function() {
    userEntity = Meteor.user();
    if (userEntity.profile.clockedIn) {
      return true;
    } else {
      return false;
    }
  },
});

// events
Template.DashboardEmployee.events({
  // clock user in
  'click .clock-employee-in-btn': function(event) {
    event.preventDefault();
    var userId = Meteor.userId();
    var created = Date();

    Meteor.call(
      "clockUserIn",
      userId, created,
      function(error, result) {
        if (error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>You have been clocked in</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'User Clocked In'
          });
        }
      }
    );

    // auto dismiss
    $("#alert").fadeTo(2000, 500).slideUp(500, function() {
      $("#alert").slideUp(500);
    });
  },

  // clock user out
  'click .clock-employee-out-btn': function(event) {
    event.preventDefault();
    var created = Date();
    var userId = Meteor.userId();

    Meteor.call(
      "clockUserOut",
      userId, created,
      function(error, result) {
        if (error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>You have been clocked out</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'User Clocked Out'
          });
        }
      }
    );

    // auto dismiss
    $("#alert").fadeTo(2000, 500).slideUp(500, function() {
      $("#alert").slideUp(500);
    });
  },
});
