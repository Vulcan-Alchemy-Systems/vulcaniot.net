// on Created
Template.MenuList.onCreated(function() {
  Session.set('redirectAfterLogin', 'MenuList');
  Session.set("search-query", "");

  // auto run
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscribe
    this.subscribe('allMenu', skipCount);
  });
});

// rendered
Template.MenuList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Menu List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.MenuList.helpers({
  menuItems: function() {
    return Menu.find({}).fetch();
  }
});

// events
Template.MenuList.events({
  // new
  'click .menu-new': function(event) {
    event.preventDefault();
    Session.set('MenuNew', !Session.get('MenuNew'));
  },

  // Edit
  'click .menu-edit': function(event) {
    event.preventDefault();
    Session.set('MenuEdit', !Session.get('MenuEdit'));
  },

  // Delete
  'click .menu-delete': function(event) {
    event.preventDefault();
    Session.set('MenuDelete', !Session.get('MenuDelete'));
  },

  // view
  'click .menu-view': function(event) {
    event.preventDefault();
    Session.set('MenuId', this._id);
    Session.set('MenuView', !Session.get('MenuView'));
  },
});

// routes
FlowRouter.route('/admin/menu/:page', {
  name: 'MenuListPage',
  parent: 'admin',
  title: 'Menu',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'MenuList'});
  },
});

FlowRouter.route('/admin/menu', {
  name: 'MenuList',
  parent: 'admin',
  title: 'Menu',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'MenuList'});
  },
});
