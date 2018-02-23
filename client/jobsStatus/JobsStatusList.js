// onCreated
Template.JobsStatusList.onCreated(function() {
  this.autorun(() => {
    this.subscribe('jobsStatus');
  });
});

// helpers
Template.JobsStatusList.helpers({
  // jobStatus
  jobStatus: function() {
    return JobsStatus.find({}).fetch();
  }
});

// events
Template.JobsStatusList.events({
  // jobs-status-new
  'click .jobs-status-new': function(event) {
    event.preventDefault();
    Session.set('JobsStatusNew', !Session.get('JobsStatusNew'));
    Session.set('JobsStatusDelete', false);
    Session.set('JobsStatusEdit', false);
  },
  // jobs-status-delete
  'click .jobs-status-edit': function(event) {
    event.preventDefault();
    Session.set('JobsStatus', this);
    Session.set('JobsStatusEdit', !Session.get('JobsStatusEdit'));
    Session.set('JobsStatusDelete', false);
    Session.set('JobsStatusNew', false);
  },
  // jobs-status-edit
  'click .jobs-status-delete': function(event) {
    event.preventDefault();
    Session.set('JobsStatus', this);
    Session.set('JobsStatusDelete', !Session.get('JobsStatusDelete'));
    Session.set('JobsStatusEdit', false);
    Session.set('JobsStatusNew', false);
  }
});

// routes
FlowRouter.route('/admin/jobs/status', {
  name: 'JobsStatusList',
  parent: 'admin',
  title: 'Job Status',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'JobsStatusList'});
  },
});
