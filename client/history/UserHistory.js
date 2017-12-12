// created
Template.UserHistory.onCreated(function() {
    this.autorun(() => {
      var id = FlowRouter.getParam('id');
      this.subscribe('userHistory');
    });
});

// rendered
Template.UserHistory.rendered = function(){
  var userData = Session.get('userData');
  Meteor.call(
    "getUserHistory",
    userData._id,
    function (error, result) {
      Session.set('userHistory', result);
    }
  );
};

// helpers
Template.UserHistory.helpers({
  getUserHistory: function() {
    return Session.get('userHistory')
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
});
