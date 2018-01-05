// on Created
Template.CategoryList.onCreated(function() {
  Session.set('redirectAfterLogin', 'categoryList');
  Session.set("search-query", "");

  // auto run
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscribe
    this.subscribe('allCategory', skipCount);
  });
});

// rendered
Template.CategoryList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Category List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.CategoryList.helpers({

});

// events
Template.CategoryList.events({

});

// routes
FlowRouter.route('/admin/category/:page', {
  name: 'CategoryListPage',
  parent: 'admin',
  title: 'Categories',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CategoryList'});
  },
});

FlowRouter.route('/admin/category', {
  name: 'CategoryList',
  parent: 'admin',
  title: 'Categories',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CategoryList'});
  },
});
