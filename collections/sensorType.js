import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

SensorType = new Meteor.Collection("sensorType");

// rules
SensorType.allow({
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

// schema
SensorTypeSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },
  // createdAt
  createdAt: {
    type: Date,
    label: "Last Modified",
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  },
});

// attach
SensorType.attachSchema(SensorTypeSchema);

// methods
Meteor.methods({
  // sensorTypeCreate
  sensorTypeCreate: function(name) {
    var result = SensorType.insert({
      name: name
    });

    return result;
  },

  // sensorTypeUpdate
  sensorTypeUpdate: function(id, name) {
    var result = SensorType.update(id, {$set: {
      name: name
    }});
  },

  // sensorTypeDelete
  sensorTypeDelete: function(id) {
    var result = SensorType.remove({_id: id});


      return result;
  }
});
