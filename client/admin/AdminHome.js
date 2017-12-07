
// helpers
Template.AdminHome.helpers({
  userCount: function() {
      return Meteor.users.find({}).count();
  }
});

// events
Template.AdminHome.events({});


// router
FlowRouter.route('/admin', {
  name: 'admin',
  parent: 'dashboard',
  title: 'Admin',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'AdminHome'});
  },
});
