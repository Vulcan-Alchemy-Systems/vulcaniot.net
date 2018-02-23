Meteor.publish("jobsMaterials", function(jobId) {
  return JobsMaterials.find({jobId: jobId});
});

Meteor.publish("singleJobsMaterials", function(jobsMaterialsId) {
  return JobsMaterials.findOne({_id: jobsMaterialsId});
});
