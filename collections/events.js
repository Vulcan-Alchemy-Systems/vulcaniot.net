Events = new Meteor.Collection("events");

Events.allow({
  insert: function() {
    return true;
  }
});

Meteor.methods({
  'eventsReset'(){
    Events.remove({});
  },
  getLastHour: function(sensorId) {
    return Events.find({
      "createdAt": {
        $gte: new Date() - (1000 * 60)
      },
    }).fetch();
  }
});
