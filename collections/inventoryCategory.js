import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

InventoryCategory = new Meteor.Collection("inventory_category");

// rules
InventoryCategory.allow({
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

// schema
InventoryCategorySchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
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
InventoryCategory.attachSchema(InventoryCategorySchema);

// methods
Meteor.methods({
  'createInventoryCategory': function(inventoryCategory) {
    return InventoryCategory.insert(inventoryCategory);
  },
  'updateInventoryCategory': function(id, inventoryCategory) {
    return InventoryCategory.update({_id: id}, inventoryCategory);
  },
  'deleteInventoryCategory': function(id) {
    return InventoryCategory.remove({_id: id});
  }
});
