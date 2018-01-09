// created
Template.ProductList.onCreated(function() {
  this.autorun(() => {
    var jobId = FlowRouter.getParam('id');
  });
});

// helpers
Template.ProductList.helpers({

});

// events
Template.ProductList.events({
  'click .new-product': function(event) {
    Session.set('NewProduct', !Session.get('NewProduct'));
  }
});

// routes
FlowRouter.route('/admin/products/:page', {
  name: 'ProductListPage',
  parent: 'admin',
  title: 'Products',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'ProductList'});
  },
});

FlowRouter.route('/admin/products', {
  name: 'ProductList',
  parent: 'admin',
  title: 'Products',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'ProductList'});
  },
});
