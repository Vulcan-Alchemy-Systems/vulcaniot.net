import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});
var awsIot = require('aws-iot-device-sdk');

var json = {};

var device = awsIot.device({
  keyPath: '/home/projects/vulcaniot.net/certs/weight_sensor.private.key',
  certPath: '/home/projects/vulcaniot.net/certs/weight_sensor.cert.pem',
  caPath: '/home/projects/vulcaniot.net/certs/root-CA.crt',
  clientId: 'weight_sensor',
  host: 'a2b48gn42hre1b.iot.us-west-2.amazonaws.com',
  debug: true
});

// conect
device.on('connect', function() {
  console.log('connect');
  device.subscribe('weight');
});

device.on('close', function() {
  console.log('close');
});

// message
device.on('message', function(topic, payload) {
    let json = JSON.parse(payload.toString('utf8'));
    console.log(json);

});
