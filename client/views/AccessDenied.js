FlowRouter.route('/access-denied', {
  name: 'AccessDenied',
  parent: 'dashboard',
  title: 'Access Denied',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'AccessDenied'});
  },
});
