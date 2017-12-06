
Template.NavbarNotifications.rendered = function(){
  Meteor.setInterval(function () {
    Meteor.call(
      "notices.latest",
      5,
      function (error, result) {
        Session.set('noticesLatest', result);
      }
    );
  },1000);
};

Template.NavbarNotifications.helpers({
  noticesCount: function() {
    return Session.get('noticesCount');
  },
  noticesLatest: function() {
    return Session.get('noticesLatest');
  },
  dateFormat: function(date) {
    return moment(date).format(Meteor.settings.public.longDate);
  }
});
