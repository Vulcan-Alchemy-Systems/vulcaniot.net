Meteor.publish("allEvents", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'eventCount', Events.find(), {
    noReady: true
  });

  return Events.find({});
});

Meteor.publish("sensorEvents", function(deviceId, skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'sensorEventsCount', Events.find({}), {
    noReady: true
  });


  return Events.find({deviceId: deviceId}, {"sort" : [['createdAt', 'desc']], limit: Meteor.settings.public.recordsPerPage, skip: skipCount});
});
