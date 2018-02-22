
Template.EmployeeList.onCreated(function() {
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allUsers', skipCount);
    Session.set("search-query", "");
  });
});

// rendered
Template.EmployeeList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Employee List'
  });
};

Template.EmployeeList.searchResults = function () {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Meteor.users.find( { $or: [{'profile.name': query}]} );
    return results;
}

// helpers
Template.registerHelper( 'employeeIsActive', (profile) => {
  if(profile.status == 'Active') {
    return 'bg-aqua-active';
  } else {
    return 'bg-red';
  }
});

Template.registerHelper( 'isOnline', (profile) => {
  if(profile.clockedIn) {
    return '<span class="pull-right badge bg-green">online</span></a>';
  } else {
    return '<span class="pull-right badge bg-red">offline</span></a>';
  }
});

Template.EmployeeList.helpers({
  searchQuery: function() {
    return Session.get("search-query");
  },
  // get user primary address
  userPrimaryEmail: function(emails) {
    return emails[0].address;
  },
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/employees/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/employees/:page";
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
Template.EmployeeList.events({
  // employee-new
  'click .employee-new': function(event) {
    event.preventDefault();
    Session.set('EmployeeNew', !Session.get('EmployeeNew'));
  },
  // clicked the message user
  'click .message-user': function(event) {
    Session.set('composeMessage', true);
    Session.set('messageUserId', this._id);
    FlowRouter.go('messages');
  },
  'keyup .employee-search': function(event) {
    Session.set("search-query", event.currentTarget.value);
    console.log(event.currentTarget.value);
  }
});

// router
FlowRouter.route('/employees', {
  name: 'employeeList',
  parent: 'dashboard',
  title: 'Employees',
  triggersEnter: [function(context, redirect) {
    // if no user id
    if (! Meteor.userId()) {
      FlowRouter.go('signIn');
    }
    // if we are not manager role piss off
    if (! Roles.userIsInRole(Meteor.userId(), ['manager'])) {
      FlowRouter.go('accessDenied');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'EmployeeList'});
  },
});

FlowRouter.route('/employees/:page', {
  name: 'employeeListPage',
  parent: 'dashboard',
  title: 'Employees',
  triggersEnter: [function(context, redirect) {
    // if no user id
    if (! Meteor.userId()) {
      FlowRouter.go('signIn');
    }
    // if we are not manager role piss off
    if (! Roles.userIsInRole(Meteor.userId(), ['manager'])) {
      FlowRouter.go('accessDenied');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'EmployeeList'});
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
