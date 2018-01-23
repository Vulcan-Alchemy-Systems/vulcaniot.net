import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Attribute = new Meteor.Collection("attribute");

// rules
Attribute.allow({
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

//schemas
ValuesSchema = new SimpleSchema({
  // keyword
  value: {
    type: String,
    label: "Value"
  },
});

//schemas
AttributeSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name"
  },

  // active
  active: {
    type: Boolean,
    label: "Active",
  },

  // order
  order: {
    type: String,
    label: "Order"
  },

  // values
  values: {
    label:  "Values",
    type: Array,
  },
  'values.$': ValuesSchema,

  // created
  created: {
    type: Date,
    label: "Created",
    autoform: {
      type: "hidden",
    }
  },

  // lastModified
  lastModified: {
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
Attribute.attachSchema(AttributeSchema);

// methods
Meteor.methods({
  // create
  attributeCreate: function(attributeEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Attribute.insert(attributeEntity);
  },

  // update
  attributeUpdate: function(attributeId, attributeEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Attribute.update({_id: attributeId}, attributeEntity);
  },

  // delete
  attributeDelete: function(attributeId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    Attribute.remove({_id: attributeId});
  }
});
