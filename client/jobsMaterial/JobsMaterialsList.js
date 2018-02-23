// onCreated
Template.JobsMaterialsList.onCreated(function() {
  this.autorun(() => {
    var jobId = FlowRouter.getParam('jobId');
    var customerId = FlowRouter.getParam('customerId');
    this.subscribe('singleCustomer', customerId);
    this.subscribe('jobsMaterials', jobId);
    this.subscribe('singleJob', jobId);
  });
});

// helpers
Template.JobsMaterialsList.helpers({
  // JobMaterials
  JobMaterials: function() {
    var jobId = FlowRouter.getParam('jobId');
    return JobsMaterials.find({jobId: jobId}).fetch();
  }
});

// events
Template.JobsMaterialsList.events({
  // jobs-materials-new
  'click .jobs-materials-new': function(event) {
    event.preventDefault();
    Session.set('JobsMaterialsDelete', false);
    Session.set('JobsMaterialsEdit', false);
    Session.set('JobsMaterialsNew', ! Session.get('JobsMaterialsNew'));
  },
  // jobs-materials-edit
  'click .jobs-materials-edit': function(event) {
    event.preventDefault();
    Session.set('JobsMaterialsDelete', false);
    Session.set('JobsMaterialsNew', false);
    Session.set('JobsMaterial', this);
    Session.set('JobsMaterialsEdit', ! Session.get('JobsMaterialsEdit'));
  },
  // jobs-materials-delete
  'click .jobs-materials-delete': function(event) {
    event.preventDefault();
    Session.set('JobsMaterialsEdit', false);
    Session.set('JobsMaterialsNew', false);
    Session.set('JobsMaterial', this);
    Session.set('JobsMaterialsDelete', ! Session.get('JobsMaterialsDelete'));
  }
});
