
FlowRouter.route('/', {
  name: 'dashboard',
  title: 'Dashboard',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'Home'});
  },
});




// errors
FlowRouter.notFound = {
  name: 'notFound',
  parent: 'dashboard',
  title: 'Page Not Found',
  action: function() {
    BlazeLayout.render('MainLayout', {main: "PageNotFound"});
  }
};
