import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Vendors = new Meteor.Collection("vendors");

Vendors.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

AddressSchema = new SimpleSchema({
  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Billing",
          value: "Billing"
        },
        {
          label: "Shipping",
          value: "Shipping"
        },
        {
          label: "Other",
          value: "Other"
        },
      ]
    }
  },

  // street
  street: {
    type: String,
    label: "Street"
  },

  // streetCont
  streetCont: {
    type: String,
    label: "Street Cont.",
    optional: true,
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
});

PhonesSchema = new SimpleSchema({
  // number
  number: {
    type: String,
    label: "Number"
  },

  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Primary",
          value: "Primary"
        },
        {
          label: "Other",
          value: "Other"
        },
        {
          label: "Fax",
          value: "Fax"
        },
      ]
    }
  },
});

EmailSchema = new SimpleSchema({
  // address
  address: {
    type: String,
    label: "E-Mail",
    optional: false,
  },

  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },
});

// Vendors Schema
VendorsSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },

  // website
  website: {
    type: String,
    label: "Website",
    optional: true,
  },

  // phones
  phones: {
    type: Array,
    optional: true,
    label: "Phones"
  },
  'phones.$': PhonesSchema,

  // addresses
  addresses: {
    type: Array,
    optional: true,
    label: "Addresses"
  },
  'addresses.$': AddressSchema,

  // emails
  emails: {
    type: Array,
    optional: true,
    label: "E-Mails"
  },
  'emails.$': EmailSchema,

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

  // createdAt
  createdAt: {
    type: Date,
    label: "Created",
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  },
});

// attach
Vendors.attachSchema(VendorsSchema);

// methods
Meteor.methods({
  'createVendor': function(vendor) {
    return Vendors.insert(vendor);
  },
  'updateVendor': function(id, vendor) {
    return Vendors.update({_id: id}, vendor);
  },
  'deleteVendor': function(id) {
    return Vendors.remove({_id: id});
  }
});
