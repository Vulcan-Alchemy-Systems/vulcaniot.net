// onCreated
Template.JobsBatchList.onCreated(function() {
  this.autorun(() => {
    var jobId = FlowRouter.getParam('jobId');
  });
});

// helpers
Template.JobsBatchList.helpers({
  // JobsBatchs
  JobsBatchs: function() {
    var jobId = FlowRouter.getParam('jobId');
    return JobsBatch.find({jobId: jobId}).fetch();
  }
});

// events
Template.JobsBatchList.events({
  // jobs-batch-new
  'click .jobs-batch-new': function() {
    event.preventDefault();
    Session.set('JobsBatchNew', ! Session.get('JobsBatchNew'));
  }
});
