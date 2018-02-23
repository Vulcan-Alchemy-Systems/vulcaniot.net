Meteor.publish("jobsStatus", function() {
  return JobsStatus.find({});
});
