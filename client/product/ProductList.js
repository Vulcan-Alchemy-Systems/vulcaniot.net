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
  // new
  'click .product-new': function(event) {
    event.preventDefault();
    Session.set('ProductNew', !Session.get('ProductNew'));
  },

  // edit
  'click .product-edit': function(event) {
    event.preventDefault();
    Session.set('ProductEdit', !Session.get('ProductEdit'));
  },

  // delete
  'click .product-delete': function(event) {
    event.preventDefault();
    Session.set('ProductDelete', !Session.get('ProductDelete'));
  },

  // view
  'click .product-view': function(event) {
    event.preventDefault();
    Session.set('ProductView', !Session.get('ProductView'));
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
