import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Device = new Meteor.Collection("device");

// rules
Device.allow({
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
DeviceSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name"
  },

  // manufacture
  manufacture: {
    type: String,
    label: "Manufacture"
  },

  // model
  model: {
    type: String,
    label: "Model"
  },

  // serialNumber
  serialNumber: {
    type: String,
    label: "Serial Number",
    optional: true,
  },

  // website
  website: {
    type: String,
    label: "Website",
    optional: true,
  },

  // vendor
  vendor: {
    type: String,
    label: "Vendor",
    optional: false,
    autoform: {
      type: "select",
    }
  },

  // installed
  installed: {
    type: Date,
    label: "Installed",
    autoform: {
      type: "datetime-local",
    }
  },

  // lastMaintenance
  lastMaintenance: {
    type: Date,
    label: "Last Maintenance",
    optional: true,
    autoform: {
      type: "datetime-local",
    }
  },

  // maintenanceScheduale
  maintenanceScheduale: {
    type: String,
    label: "Maintenance Scheduale",
    autoform: {
      type: "select",
      options: [
        {
          label: "Daily",
          value: "Daily"
        },
        {
          label: "Weekly",
          value: "Weekly"
        },
        {
          label: "Monthly",
          value: "Monthly"
        },
        {
          label: "Yearly",
          value: "Yearly"
        },
        {
          label: "None",
          value: "None"
        },
        {
          label: "Other (See Notes)",
          value: "Other (See Notes)"
        },
      ]
    }
  },

  // status
  status: {
    type: String,
    label: "Status",
    autoform: {
      type: "select",
      options: [
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

  // type
  vendor: {
    type: String,
    label: "Vendor",
    optional: false,
    autoform: {
      type: "select",
    }
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
Device.attachSchema(DeviceSchema);

// methods
Meteor.methods({
  createDevice: function(name) {

  },
  updateDevice: function(id, name) {

  },
  deleteDevice: function(id) {

  }
});
