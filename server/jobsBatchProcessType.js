// allJobsBatchType
Meteor.publish("allJobsBatchProcessType", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'DeviceCount', DeviceType.find(), {
    noReady: true
  });

  // return
  return JobsBatchProcessType.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// singleJobsBatchType
Meteor.publish("singleJobsBatchProcessType", function(id) {
  return JobsBatchProcessType.find({_id: id});
});

// allActiveJobsBatchTypes
Meteor.publish("allActiveJobsBatchProcessTypes", function() {

  return JobsBatchProcessType.find();
});
