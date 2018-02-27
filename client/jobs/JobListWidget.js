Template.JobListWidget.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allJobsLimit', 5);
  });
});

// helpers
Template.JobListWidget.helpers({
  jobs: function() {
    var results =  Jobs.find({jobStatus: {$ne: 'Completed'}}).fetch();
    return results;
  },
});
