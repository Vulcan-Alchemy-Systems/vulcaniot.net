// allDeviceTypes
Meteor.publish("allDeviceTypes", function(skipCount) {
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
  return DeviceType.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// singleDeviceType
Meteor.publish("singleDeviceType", function(id) {
  return DeviceType.find({_id: id});
});
