// onCreated
Template.JobsBatchNew.onCreated(function() {
  this.autorun(() => {
    var jobId = FlowRouter.getParam('jobId');
    this.subscribe('singleJob', jobId);
  });
});

// helpers
Template.JobsBatchNew.helpers({

});

// events
Template.JobsBatchNew.events({

});
