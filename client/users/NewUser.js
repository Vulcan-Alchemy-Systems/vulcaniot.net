// helpers
Template.NewUser.helpers({
});

// events
Template.NewUser.events({
  // create user
  'click .new-user-submit': function(event) {
    Session.set('NewUser', !Session.get('NewUser'));
  },

});
