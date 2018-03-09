Meteor.publish("allSensorTypes", function(locationId) {
  return SensorType.find();
});

Meteor.publish("singleSensorType", function(id) {
  return SensorType.find({_id: id});
});
