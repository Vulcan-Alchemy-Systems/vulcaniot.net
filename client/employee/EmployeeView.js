Template.EmployeeView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleUser', id);
  });
});

// rendered
Template.EmployeeView.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Employee'
  });
};

// helpers
Template.EmployeeView.helpers({
  // gets all users
  getUser: function() {
    var id = FlowRouter.getParam('id');
    return Meteor.users.findOne({_id: id});
  },

  // get user primary address
  userPrimaryEmail: function(emails) {
    return emails[0].address;
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
Template.EmployeeView.events({
  // clicked the message user
  'click .message-user': function(event) {
    Session.set('composeMessage', true);
    Session.set('messageUserId', FlowRouter.getParam('id'));
    FlowRouter.go('messages');
  }
});


// router
FlowRouter.route('/employees/:id/view', {
  name: 'employeeView',
  parent: 'employeeList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'EmployeeView'});
  },
});
