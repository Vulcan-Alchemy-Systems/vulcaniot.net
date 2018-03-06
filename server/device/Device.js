// allDevices
Meteor.publish("allDevices", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'DeviceCount', Device.find(), {
    noReady: true
  });

  // return
  return Device.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// allActiveDevices
Meteor.publish("allActiveDevices", function() {
  // return
  return Device.find({status: 'Active'});
});

// singleDevice
Meteor.publish("singleDevice", function(id) {
  return Device.find({_id: id});
});
