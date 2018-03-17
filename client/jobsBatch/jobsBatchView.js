// onCreated
Template.JobsBatchView.onCreated(function() {
  this.autorun(() => {
    var id = Session.get('JobsBatchId');
    this.subscribe('singleJobsBatch', id);
  });
});

// helpers
Template.JobsBatchView.helpers({
  // JobsBatchs
  JobsBatch: function() {
    var id = Session.get('JobsBatchId');
    return JobsBatch.findOne({_id: id});
  }
});

// events
Template.JobsBatchView.events({
  // jobs-batch-process-new
  'click .jobs-batch-process-new': function(event) {
    event.preventDefault();
    console.log('here');
    Session.set('JobsBatchProcessNew', ! Session.get('JobsBatchProcessNew'));
  }
});
