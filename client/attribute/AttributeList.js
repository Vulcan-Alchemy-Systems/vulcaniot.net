// on Created
Template.AttributeList.onCreated(function() {
  Session.set('redirectAfterLogin', 'AttributeList');
  Session.set("search-query", "");

  // auto run
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscribe
    this.subscribe('allAttribute', skipCount);
  });
});

// rendered
Template.AttributeList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Menu List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.AttributeList.helpers({
  attributes: function() {
    return Attribute.find({}).fetch();
  }
});

// events
Template.AttributeList.events({

});

// routes
FlowRouter.route('/admin/attribute/:page', {
  name: 'AttributeListPage',
  parent: 'admin',
  title: 'Attribute',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'AttributeList'});
  },
});

FlowRouter.route('/admin/attribute', {
  name: 'AttributeList',
  parent: 'admin',
  title: 'Attribute',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'AttributeList'});
  },
});
