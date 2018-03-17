// allJobsBatchType
Meteor.publish("allJobsBatchType", function(skipCount) {
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
  return JobsBatchType.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// singleJobsBatchType
Meteor.publish("singleJobsBatchType", function(id) {
  return JobsBatchType.find({_id: id});
});

// allActiveJobsBatchTypes
Meteor.publish("allActiveJobsBatchTypes", function() {

  return JobsBatchType.find();
});
