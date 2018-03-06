// onCreated
Template.DeviceSensorList.onCreated(function() {
  Session.set('redirectAfterLogin', 'deviceList');
  this.autorun(() => {
    // subscriptions

  });
});

// rendered
Template.DeviceSensorList.rendered = function() {
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Device Sensor List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.DeviceSensorList.helpers({

});

// events
Template.DeviceSensorList.events({
  'click .device-sensor-new': function(event) {
    event.preventDefault();
    Session.set('DeviceSensorNew', ! Session.get('DeviceSensorNew'));
    console.log('clicked')
  },
});
