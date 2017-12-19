// helpers
Template.ListTransfers.helpers({
  transfers: function() {
    return [];
  },
});

// events
Template.ListTransfers.events({
  'click .new-transfer': function(event) {
    Session.set('NewTransfer', !Session.get('NewTransfer'));
  },
});
