// helpers
Template.CustomerUserList.helpers({
  transfers: function() {
    return [];
  },
});

// events
Template.CustomerUserList.events({
  'click .new-customer-user': function(event) {
    Session.set('NewCustomerUser', !Session.get('NewCustomerUser'));
  },
});
