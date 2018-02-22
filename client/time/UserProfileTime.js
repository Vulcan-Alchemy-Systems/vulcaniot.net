// created
Template.UserProfileTime.onCreated(function() {
  this.autorun(() => {
    this.subscribe('singleUserTime', Meteor.userId());
  });
});

// rendered
Template.UserProfileTime.rendered = function(){
  // record history
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'User Viewed Time Clock'
  });
};

// helpers
Template.UserProfileTime.helpers({
  // get user Time
  getUserTimes: function() {
    // try and fetch users time
    try {
      return Time.find({userId: Meteor.userId()},  {"sort" : [['created', 'desc']]}).fetch();
    } catch (error) {
      Meteor.call('recordError', 'vulcaniot.net', 'danger', 'Falied to fetch user times', 'Falied to fetch user times', null, function (error, result) {
        if(error) {

        } else {

        }
      });
    }
  },

  // is clocked in
  isClockedIn: function() {
    userEntity = Meteor.user();
    if(userEntity.profile.clockedIn) {
      return true;
    } else {
      return false;
    }
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
Template.UserProfileTime.events({
  // clock user in
  'click .clock-user-in-btn': function(event) {
    event.preventDefault();
    var userId = Meteor.userId();
    var created = Date();

    Meteor.call(
      "clockUserIn",
      userId, created,
      function (error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
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

    // auto dismis
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });
  },

  // clock user out
  'click .clock-user-out-btn': function(event) {
      event.preventDefault();
      var created = Date();
      var userId = Meteor.userId();

      Meteor.call(
        "clockUserOut",
        userId, created,
        function (error, result) {
          if(error) {
            $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <i class="fa fa-warning"></i> Error ' + error.message + '</div>');
          } else {
            $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> You have been clocked out</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'User Clocked Out'
          });
        }
      }
    );

    // auto dismis
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });
  }
});
