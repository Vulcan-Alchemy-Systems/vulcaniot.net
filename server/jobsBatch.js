// singleJobsBatchType
Meteor.publish("singleJobsBatch", function(id) {
  return JobsBatch.find({_id: id});
});

// allActiveJobsBatchTypes
Meteor.publish("allActiveJobsBatch", function(jobId) {

  return JobsBatch.find({jobId: jobId});
});
