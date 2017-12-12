
Template.EmployeeList.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allUsers');
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
