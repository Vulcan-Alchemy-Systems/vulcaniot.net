Template.VendorList.onCreated(function() {
  this.autorun(() => {

  });
});


// router
FlowRouter.route('/vendors', {
  name: 'vendorList',
  parent: 'dashboard',
  title: 'Vendors',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'VendorList'});
  },
});
