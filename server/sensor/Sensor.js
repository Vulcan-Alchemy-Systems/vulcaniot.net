Meteor.publish("allSensors", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'sensorCount', Sensors.find(), {
    noReady: true
  });

  // return
  return Sensors.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

Meteor.publish("allLocationSensors", function(locationId) {
  return Sensors.find({locationId: locationId});
});

Meteor.publish("singleSensors", function(id) {
  return Sensors.find({_id: id});
});

Meteor.publish("scaleSensor", function() {
  
});
