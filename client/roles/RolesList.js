Template.RolesList.onCreated( () => {
  Template.instance().subscribe( 'roles' );
});


// helpers
Template.RolesList.helpers({});

// events
Template.RolesList.events({});


// router
FlowRouter.route('/admin/roles', {
  name: 'roles',
  parent: 'admin',
  title: 'Roles',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'RolesList'});
  },
});
