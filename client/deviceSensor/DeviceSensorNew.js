// onCreated
Template.DeviceSensorNew.onCreated(function() {
  Session.set('redirectAfterLogin', 'deviceList');
  this.autorun(() => {
    // subscriptions
      this.subscribe('allActiveDevices');
  });
});

// rendered
Template.DeviceSensorNew.rendered = function() {
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Device Sensor New'
  });

  // scroll to top of page
  $('body').scrollTop(0);

  // set device from param if available
  var id = FlowRouter.getParam('id');
  if(id) {
    $('#device').val(id);
  }

};

// helpers
Template.DeviceSensorNew.helpers({
  devices: function() {
    return Device.find().map(function(values) {
      return {
        label: values.name,
        value: values._id
      };
    });
  }
});

// events
Template.DeviceSensorNew.events({
  'click .device-sensor-new-submit': function(event) {
    event.preventDefault();

    var id = FlowRouter.getParam('id');

    // set up form
    var formData = AutoForm.getFormValues('insertDeviceSensorForm').insertDoc;

    Meteor.call('createSensor', device, type, display, name, description, status, sub, function(error, result) {
      if(error) {

      } else {

      }
    });
  },
});
