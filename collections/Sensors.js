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

ParamSchema = new SimpleSchema({
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Low",
          value: "Low"
        },
        {
          label: "High",
          value: "High"
        },
        {
          label: "Active",
          value: "Active"
        },
        {
          label: "Not Active",
          value: "Not Active"
        },
      ]
    }
  },
  value: {
    type: String,
    label: "Value",
  },
  alert: {
    type: Boolean,
    label: "Send Alert",
  }
});

SensorSchema = new SimpleSchema({
  // locationId
  locationId: {
    type: String,
    label: "Location Id",
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

  // params
  parameters: {
    type: Array,
    label: "Params",
    optional: true,
  },
  'parameters.$': ParamSchema,

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
  createSensor: function(sensor) {
    Sensors.insert(sensor);
  },
  updateSensor: function(id, sensor) {
    Sensors.update(id, sensor);
  }
});
