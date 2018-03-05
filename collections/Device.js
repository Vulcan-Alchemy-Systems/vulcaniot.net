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
    label: "Manufacture",
    optional: true,
  },

  // model
  model: {
    type: String,
    label: "Model",
    optional: true,
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
    optional: true,
    autoform: {
      type: "select",
    }
  },

  // location
  location: {
    type: String,
    label: "Location",
    optional: false,
    autoform: {
      type: "select",
    }
  },

  // installed
  installed: {
    type: Date,
    label: "Installed",
    optional: true,
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
  type: {
    type: String,
    label: "Type",
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
  createDevice: function(name, manufacture, model, serialNumber, website, vendor, location, installed, lastMaintenance, maintenanceScheduale, status, type) {

    var result = Device.insert({
      name: name,
      manufacture: manufacture,
      model: model,
      serialNumber: serialNumber,
      website: website,
      vendor: vendor,
      location: location,
      installed: installed,
      lastMaintenance: lastMaintenance,
      maintenanceScheduale: maintenanceScheduale,
      status: status,
      type: type
    });

    return result;
  },

  // updateDevice
  updateDevice: function(id, name, manufacture, model, serialNumber, website, vendor, location, installed, lastMaintenance, maintenanceScheduale, status, type) {

    var result = Device.update(id, {$set: {
      name: name,
      manufacture: manufacture,
      model: model,
      serialNumber: serialNumber,
      website: website,
      vendor: vendor,
      location: location,
      installed: installed,
      lastMaintenance: lastMaintenance,
      maintenanceScheduale: maintenanceScheduale,
      status: status,
      type: type
    }});

    return result;
  },

  // deleteDevice
  deleteDevice: function(id) {

    var result = Device.remove({_id: id});

    return result;
  }
});
