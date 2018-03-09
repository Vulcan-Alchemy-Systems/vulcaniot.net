import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

DeviceType = new Meteor.Collection("deviceType");

// rules
DeviceType.allow({
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
DeviceTypeSchema = new SimpleSchema({
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
DeviceType.attachSchema(DeviceTypeSchema);

// methods
Meteor.methods({
  // deviceTypeCreate
  deviceTypeCreate: function(name) {
    var result = DeviceType.insert({
      name: name
    });

    return result;
  },

  // deviceTypeUpdate
  deviceTypeUpdate: function(id, name) {
    var result = DeviceType.update(id, {$set: {
      name: name
    }});
  },

  // deviceTypeDelete
  deviceTypeDelete: function(id) {
    var result = DeviceType.remove({_id: id});


      return result;
  }
});
