Template.NoticesCount.rendered = function(){
  Meteor.setInterval(function () {
    Meteor.call(
      "notices.count",
      ...arguments,
      function (error, result) {
        Session.set('noticesCount', result);
      }
    );
  },1000);
};

Template.NoticesCount.helpers({
  noticesCount: function() {
    return Session.get('noticesCount');
  },
});
