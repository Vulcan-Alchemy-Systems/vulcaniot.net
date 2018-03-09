Template.AdminHome.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allUsers', 0);
  });
});

// rendered
Template.AdminHome.rendered = function(){
  // history
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Admin Home'
  });
};

// helpers
Template.AdminHome.helpers({
  userCount: function() {
    return Counts.get('userCount');
  }
});

// events
Template.AdminHome.events({

});


// router
FlowRouter.route('/admin', {
  name: 'admin',
  parent: 'dashboard',
  title: 'Admin',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'AdminHome'});
  },
});
