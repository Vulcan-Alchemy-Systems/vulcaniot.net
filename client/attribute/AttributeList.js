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
    this.subscribe('allAttributes', skipCount);
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
    console.log(Attribute.find({}).fetch())
    return Attribute.find({}).fetch();
  }
});

// events
Template.AttributeList.events({
  // new
  'click .attribute-new': function(event) {
    event.preventDefault();
    Session.set('AttributeNew', ! Session.get('AttributeNew'));
  },

  // view
  'click .attribute-view': function(event) {
    event.preventDefault();
    Session.set('AttributeId', this._id);
    Session.set('AttributeView', ! Session.get('AttributeView'));
  },

  // Edit
  'click .attribute-edit': function(event) {
    event.preventDefault();
    Session.set('AttributeEdit', ! Session.get('AttributeEdit'));
  },

  // Delete
  'click .attribute-delete': function(event) {
    event.preventDefault();
    Session.set('AttributeDelete', ! Session.get('AttributeDelete'));
  }
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
