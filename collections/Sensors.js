import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Sensors = new Meteor.Collection("sensors");

Sensors.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

SensorSchema = new SimpleSchema({
  // device
  device: {
    type: String,
    label: "Device",
    autoform: {
      type: "select",
    }
  },

  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Motion Sensor",
          value: "Motion Sensor"
        },
        {
          label: "Temperature Sensor",
          value: "Temperature Sensor"
        },
        {
          label: "Glass Break Sensor",
          value: "Glass Break Sensor"
        },
      ]
    }
  },

  // display
  display: {
    type: String,
    label: "Display",
    optional: true,
    autoform: {
      type: "select",
      options: [
        {
          label: "Table",
          value: "Table"
        },
        {
          label: "Line Chart",
          value: "Line Chart"
        },
        {
          label: "Bar Chart",
          value: "Bar Chart"
        },
      ]
    }
  },

  // name
  name: {
    type: String,
    label: "Name",
  },

  // description
  description: {
    type: String,
    label: "Description",
    autoform: {
      type: "textarea"
    }
  },

  // status
  status: {
    type: String,
    label: "Initial Status",
    autoform: {
      type: "select",
      options: [
        {
          label: "OK",
          value: "OK"
        },
        {
          label: "Alert",
          value: "Alert"
        },
      ]
    }
  },

  // sub
  sub: {
    type: String,
    label: "Sub",
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
});

// attach
Sensors.attachSchema(SensorSchema);

// methods
Meteor.methods({
  // createSensor
  createSensor: function(device, type, display, name, description, status, sub) {
    var result = Sensors.insert({
      device: device,
      type: type,
      display: display,
      name: name,
      description: description,
      status: status,
      sub: sub
    });

    return result;
  },

  // updateSensor
  updateSensor: function(id, device, type, display, name, description, status, sub) {
    var result = Sensors.update(id, {$set: {
      device: device,
      type: type,
      display: display,
      name: name,
      description: description,
      status: status,
      sub: sub
    }});

    return result;
  },

  // removeSensor
  removeSensor: function(id) {
    var result = Sensors.remove({_id: id});

    return result;
  }
});
