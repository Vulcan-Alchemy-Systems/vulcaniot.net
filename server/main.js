import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

let server = Meteor.settings.private.mqttHost;

Events.mqttConnect(server, "events", {insert: true});

Events.before.insert(function (userId, doc) {
  doc.event = doc.message.event;
  doc.deviceId = doc.message.deviceId;
  doc.state = doc.message.state;
  doc.createdAt = Date.now();
});

Events.after.insert(function(userId, doc) {
  var state = doc.message.state;
  var deviceId = doc.message.deviceId;

  if(state == "OK") {
    Sensors.update({_id: deviceId}, {$set: {"status": "OK"}});
  } else {
    Sensors.update({_id: deviceId}, {$set: {"status": "Alert"}});
  }
});
