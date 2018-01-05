import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Customers = new Meteor.Collection("customers");

Customers.allow({
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

// phone schema
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

// address schema
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

// Customer Schema
CustomersSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name"
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
  // address
  address: {
    type: Array,
    optional: true,
  },
  'address.$': AddressSchema,
  // phones
  phones: {
    type: Array,
    optional: true,
  },
  'phones.$': PhonesSchema,
  // created
  created: {
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
Customers.attachSchema(CustomersSchema);

// methods
Meteor.methods({
  //update
  customerUpdate: function(customerId, customerEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Customers.update(customerId, customerEntity);
  },

  // create
  customerCreate: function(customerEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Customers.insert(customerEntity);
  },

  // delete
  customerDelete: function(customerId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Customers.remove({_id: customerId});
  }
});
