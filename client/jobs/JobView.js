Template.JobView.onCreated(function() {
  this.autorun(() => {
    var jobId = FlowRouter.getParam('jobId');
    var customerId = FlowRouter.getParam('customerId');
    this.subscribe('singleCustomer', customerId);
    this.subscribe('singleJob', jobId);
    this.subscribe('files.images.all');
  });
});

// helpers
Template.JobView.helpers({
  job: function() {
    var jobId = FlowRouter.getParam('jobId');
    var job = Jobs.findOne({_id: jobId});
    Session.set('Job', job);
    return job;
  },
  customer: function() {
    var customerId = FlowRouter.getParam('customerId');
    return Customers.findOne({_id: customerId});
  },
  longDateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
  externalReporting: function(externalReporting) {
    if(externalReporting == true) {
      return "Yes";
    } else {
      return "No";
    }
  },
});

// events
Template.JobView.events({
  // editJob
  'click .job-edit': function(event) {
    event.preventDefault();
    Session.set('JobDelete', false);
    Session.set('JobEdit', !Session.get('JobEdit'));
  },

  // delete job
  'click .job-delete': function(event) {
    event.preventDefault();
    Session.set('JobEdit', false);
    Session.set('JobDelete', !Session.get('JobDelete'));
  },

  // new note
  'click .job-note-new': function(event) {
    event.preventDefault();
    Session.set('JobNoteNew', !Session.get('JobNoteNew'));
  },

  // edit note
  'click .job-note-edit': function(event) {
    event.preventDefault();
    Session.set('JobNoteEdit', !Session.get('JobNoteEdit'));
    Session.set('JobNote', this);
  },

  // delete notes
  'click .job-note-delete': function(event) {
    event.preventDefault();
    Session.set('JobNoteDelete', !Session.get('JobNoteDelete'));
    Session.set('JobNote', this);
  },

  // new product
  'click .job-product-new': function(event) {
    event.preventDefault();
    Session.set('JobProductNew', !Session.get('JobProductNew'));
  },

  // job-product-image
  'click .job-product-image': function(event) {
    event.preventDefault();
    $('#jobProductImage').attr('src', this.image);
    $('#myModal').modal('toggle')
  },

  // job-product-delete
  'click .job-product-delete': function(event) {
    event.preventDefault();
    Session.set('JobProductDelete', !Session.get('JobProductDelete'));
    Session.set('JobProduct', this);
  },

  // job-transfer-new
  'click .job-transfer-new': function(event) {
    event.preventDefault();
    Session.set('JobTransferNew', !Session.get('JobTransferNew'));
  },

  // job-transfer-edit
  'click .job-transfer-edit': function(event) {
    event.preventDefault();
    Session.set('JobTransferEdit', !Session.get('JobTransferEdit'));
    Session.set('JobTransfer', this);
  },

  // job-transfer-edit
  'click .job-transfer-delete': function(event) {
    event.preventDefault();
    Session.set('JobTransferDelete', !Session.get('JobTransferDelete'));
    Session.set('JobTransfer', this);
  }
});

// route
FlowRouter.route('/customers/:customerId/job/:jobId', {
  name: 'JobView',
  parent: 'customerView',
  title: 'Job',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      //FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'JobView'});
  },
});
