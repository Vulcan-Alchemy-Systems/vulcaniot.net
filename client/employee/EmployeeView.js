Template.EmployeeView.onCreated(function() {
  this.autorun(() => {
    var userId = FlowRouter.getParam('id');
    Session.set('UserId',userId);
    this.subscribe('singleUser', userId);
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
Template.registerHelper( 'getUser', () => {
  var id = FlowRouter.getParam('id');
  return Meteor.users.findOne({_id: id});
});

// events
Template.EmployeeView.events({
  // message-user
  'click .message-user': function(event) {
    event.preventDefault();
    Session.set('composeMessage', true);
    Session.set('messageUserId', FlowRouter.getParam('id'));
    FlowRouter.go('messages');
  },
  // employee-password
  'click .employee-password': function(event) {
    event.preventDefault();
    Session.set('EmployeeEdit', false);
    Session.set('EmployeeDelete', false);
    Session.set('EmployeeJobs', false);
    Session.set('EmployeeTime', false);
    Session.set('EmployeePassword', ! Session.get('EmployeePassword'));
    $('body').scrollTop(0);
  },
  // employee-edit
  'click .employee-edit': function(event) {
    event.preventDefault();
    Session.set('EmployeePassword', false);
    Session.set('EmployeeDelete', false);
    Session.set('EmployeeJobs', false);
    Session.set('EmployeeTime', false);
    Session.set('EmployeeEdit', ! Session.get('EmployeeEdit'));
    $('body').scrollTop(0);
  },
  // employee-delete
  'click .employee-delete': function(event) {
    event.preventDefault();
    Session.set('EmployeeEdit', false);
    Session.set('EmployeePassword', false);
    Session.set('EmployeeJobs', false);
    Session.set('EmployeeTime', false);
    Session.set('EmployeeDelete', ! Session.get('EmployeeDelete'));
    $('body').scrollTop(0);
  },
  // employee-view
  'click .employee-view': function(event) {
    event.preventDefault();
    Session.set('EmployeeEdit', false);
    Session.set('EmployeePassword', false);
    Session.set('EmployeeDelete', false);
    Session.set('EmployeeJobs', false);
    Session.set('EmployeeTime', false);
    $('body').scrollTop(0);
  },
  // employee-jobs
  'click .employee-jobs': function(event) {
    event.preventDefault();
    Session.set('EmployeeEdit', false);
    Session.set('EmployeePassword', false);
    Session.set('EmployeeDelete', false);
    Session.set('EmployeeTime', false);
    Session.set('EmployeeJobs', ! Session.get('EmployeeJobs'));
    $('body').scrollTop(0);
  },
  // employee-time
  'click .employee-time': function(event) {
    Session.set('EmployeeEdit', false);
    Session.set('EmployeePassword', false);
    Session.set('EmployeeDelete', false);
    Session.set('EmployeeJobs', false);
    Session.set('EmployeeTime', ! Session.get('EmployeeTime'));
    $('body').scrollTop(0);
  }
});

// router
FlowRouter.route('/employees/:id/view', {
  name: 'employeeView',
  parent: 'employeeList',
  title: 'View',
  triggersEnter: [function(context, redirect) {
    // if no user id
    if (! Meteor.userId()) {
      FlowRouter.go('signIn');
    }
    // if we are not manager role piss off
    if (! Roles.userIsInRole(Meteor.userId(), ['manager'])) {
      FlowRouter.go('AccessDenied');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'EmployeeView'});
  },
});
