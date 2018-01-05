// onCreated
Template.UserCustomerList.onCreated(function() {
  this.autorun(() => {
    var customerId = Session.get('CustomerId');
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allCustomerUsers', customerId, skipCount);
  });
});

// helpers
Template.UserCustomerList.helpers({
  users: function() {
    var customerId = Session.get('CustomerId');
    var users = Meteor.users.find({'profile.customerId': customerId}, {fields: {profile: 1, emails: 1}}).fetch();
    return users;
  },
  // get users email
  getUserEmail: function(emails) {
    if(emails) {
      return emails[0].address;
    }
  },
});

// events
Template.UserCustomerList.events({
  // new
  'click .user-customer-new': function(event) {
    event.preventDefault();
    Session.set('UserCustomerNew', !Session.get('UserCustomerNew'));
  },
  // View
  'click .user-customer-view': function(event) {
    event.preventDefault();
    Session.set('UserCustomerId', this._id);
    Session.set('UserCustomerView', ! Session.get('UserCustomerView'));
  },
});
