// helpers
Template.JobsList.helpers({
  transfers: function() {
    return [];
  },
});

// events
Template.JobsList.events({
  'click .new-job': function(event) {
    Session.set('NewJob', !Session.get('NewJob'));
  },
});
