// onCreated
Template.JobsBatchList.onCreated(function() {
  this.autorun(() => {
    var jobId = FlowRouter.getParam('jobId');
    this.subscribe('allActiveJobsBatch', jobId);
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
  'click .jobs-batch-new': function(event) {
    event.preventDefault();
    Session.set('JobsBatchNew', ! Session.get('JobsBatchNew'));
  },
  // jobs-batch-view
  'click .jobs-batch-view': function(event) {
    event.preventDefault();
    Session.set('JobsBatchId', this._id);
    Session.set('JobsBatchView', ! Session.get('JobsBatchView'))
  },
});
