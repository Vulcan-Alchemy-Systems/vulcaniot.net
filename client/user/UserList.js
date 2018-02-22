// onCreated
Template.UserList.onCreated(function() {
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    this.subscribe('allUsers', skipCount);
  });
});

// rendered
Template.UserList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Admin User List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.registerHelper( 'userPrimaryEmail', (emails) => {
  if(emails) {
    return emails[0].address;
  }
});

Template.UserList.helpers({
  // gets all users
  userList: function() {
    var users = Meteor.users.find().fetch();
    if (users) {
      return users;
    }
  },

  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },
  isUserActive: function(profile) {
    if(profile.status == 'Active') {
      return 'bg-aqua-active';
    } else {
      return 'bg-red';
    }
  },
  isOnline: function(profile) {
    if(profile.clockedIn) {
      return '<span class="pull-right badge bg-green">online</span></a>';
    } else {
      return '<span class="pull-right badge bg-red">offline</span></a>';
    }
  },
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/customers/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/customers/:page";
    var params = {page: nextPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },
  prevPageClass: function() {
    return currentPage() <= 1 ? "disabled" : "";
  },
  nextPageClass: function() {
    return hasMorePages() ? "" : "disabled";
  }
});

// events
Template.UserList.events({
  'click .new-user': function(event) {
    Session.set('NewUser', !Session.get('NewUser'));
  },
  'click #prevPage': function(event) {
      $('body').scrollTop(0);
  },
  'click #nextPage': function(event) {
    $('body').scrollTop(0);
  }
});

// router
var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'adminUsers',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      FlowRouter.go('signIn');
    }
  }]
});

adminRoutes.route('/users', {
  name: 'userList',
  parent: 'admin',
  title: 'Users',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserList'});
  },
});

adminRoutes.route('/users/:page', {
  name: 'userListPage',
  parent: 'admin',
  title: 'Users',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserList'});
  },
});


var hasMorePages = function() {
  var totalEmployees = Counts.get('userCount');
  return currentPage() * parseInt(10) < totalEmployees;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
