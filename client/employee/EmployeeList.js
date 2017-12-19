
Template.EmployeeList.onCreated(function() {
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    this.subscribe('allUsers', skipCount);
  });
});

// rendered
Template.EmployeeList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Employee List'
  });
};

// helpers
Template.EmployeeList.helpers({
  // gets all users
  userList: function() {
    var users = Meteor.users.find().fetch();
    if ( users ) {
      return users;
    }
  },
  // get user primary address
  userPrimaryEmail: function(emails) {
    return emails[0].address;
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },
  // test if user is active
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
  // clicked the message user
  'click .message-user': function(event) {
    Session.set('composeMessage', true);
    Session.set('messageUserId', this._id);
    FlowRouter.go('messages');
  }
});

// router
FlowRouter.route('/employees', {
  name: 'employeeList',
  parent: 'dashboard',
  title: 'Employees',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'EmployeeList'});
  },
});
FlowRouter.route('/employees/:page', {
  name: 'employeeListPage',
  parent: 'dashboard',
  title: 'Employees',
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
