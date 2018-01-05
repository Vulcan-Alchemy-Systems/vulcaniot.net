// onCreated
Template.UserVendorList.onCreated(function() {
  this.autorun(() => {
    var vendorId = Session.get('VendorId');
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    this.subscribe('allVendorUsers', vendorId, skipCount);
  });
});

// helpers
Template.UserVendorList.helpers({
  users: function() {
    var vendorId = Session.get('VendorId');
    var users = Meteor.users.find({'profile.vendorId': vendorId}, {fields: {profile: 1, emails: 1}});
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
Template.UserVendorList.events({
  'click .user-vendor-new': function(event) {
    event.preventDefault();
    Session.set('UserVendorNew', ! Session.get('UserVendorNew'));
  },
  'click .user-vendor-view': function(event) {
    event.preventDefault();
    Session.set('UserVendorId', this._id);
    Session.set('UserVendorView', ! Session.get('UserVendorView'));
  },
});
