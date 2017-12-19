import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Locations = new Meteor.Collection("locations");

Locations.allow({
  insert: function (userId, doc) {
    console.log(doc)
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

CameraSchema = new SimpleSchema({
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
  // manufacturer
  manufacturer: {
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
});

// Room Schema
RoomSchema = new SimpleSchema({
  // roomName
  roomName: {
    type: String,
    label: "Room Name"
  },
  // room number
  roomNumber: {
    type: String,
    label: "Room Number"
  },
  // description
  description: {
    type: String,
    label: "Description",
    optional: true,
    autoform: {
      type: "textarea"
    }
  },
});

// License Schema
LicenseSchema = new SimpleSchema({
  // Number
  number: {
    type: String,
    label: "Number"
  },
  // StartDate
  startDate: {
    type: Date,
    label: "Start Date"
  },
  // EndDate
  endDate: {
    type: Date,
    label: "End Date"
  },
  // LicenseType
  licenseType: {
    type: String,
    label: "License Type"
  },
});

// Locations Schema
LocationsSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name"
  },
  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Store",
          value: "Store"
        },
        {
          label: "Producer",
          value: "Producer"
        },
        {
          label: "Manufacturer",
          value: "Manufacturer"
        },
        {
          label: "Lab",
          value: "Lab"
        },
        {
          label: "Wholesaler",
          value: "Wholesaler"
        },
        {
          label: "Research Facility",
          value: "Research Facility"
        },
      ]
    }
  },
  // street
  street: {
    type: String,
    label: "Street"
  },
  // city
  city: {
    type: String,
    label: "City"
  },
  // state
  state: {
    type: String,
    label: "State"
  },
  // postal
  postal: {
    type: String,
    label: "Postal"
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
        {
          label: "Pending",
          value: "Pending"
        },
      ]
    }
  },
  // license
  license: {
    type: Array,
    optional: true,
  },
  'license.$': LicenseSchema,
  // rooms
  rooms: {
    type: Array,
    optional: true,
  },
  'rooms.$': RoomSchema,
  // cameras
  cameras: {
    type: Array,
    optional: true,
  },
  'cameras.$': CameraSchema,
  // created
  created: {
    type: Date,
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  },
});

// attach
Locations.attachSchema(LocationsSchema);

// methods
Meteor.methods({
  // update
  updateLocation: function(id, location) {
    Locations.update(id, location);
  },
  // create
  createLocation: function(location) {
    Locations.insert(location);
  },
  // remove
  removeLocation: function(id) {
      Locations.remove({_id: id});
  },
  // get single location
  getLocation: function(id) {
    return  Locations.findOne({_id: id});
  }
});
