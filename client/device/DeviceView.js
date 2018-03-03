

// router
FlowRouter.route('/devices/:id/view', {
  name: 'deviceView',
  parent: 'deviceList',
  title: 'View',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'DeviceView'});
  },
});
