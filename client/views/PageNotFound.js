FlowRouter.notFound = {
  name: 'notFound',
  parent: 'dashboard',
  title: 'Page Not Found',
  action: function() {
    BlazeLayout.render('MainLayout', {main: "PageNotFound"});
  }
};
