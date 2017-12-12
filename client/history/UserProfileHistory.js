Template.UserProfileHistory.onCreated(function() {
    this.autorun(() => {
      this.subscribe('userHistory');
    });
});

// rendered
Template.UserProfileHistory.rendered = function(){
  var userHistoryData = Session.get('userHistoryData');
  Meteor.call(
    "getUserHistory",
    Meteor.userId(),
    function (error, result) {
      Session.set('userHistoryData', result);
    }
  );
};

// helpers
Template.UserProfileHistory.helpers({
  getUserHistoryData: function() {
    return Session.get('userHistoryData')
  },
  dateLongFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
  dateShortFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },
});
