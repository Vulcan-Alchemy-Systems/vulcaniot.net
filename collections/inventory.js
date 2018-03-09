import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Inventory = new Meteor.Collection("inventory");

// rules
Inventory.allow({
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
InventorySchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },

  // description
  description: {
    type: String,
    label: "Description",
    optional: true,
    autoform: {
      type: "textarea",
    }
  },

  // partNumber
  partNumber: {
    type: String,
    label: "Part Number",
    optional: false,
  },

  // Quantity
  quantityInStock: {
    type: String,
    label: "Quantity In Stock"
  },

  lowStockAlert: {
    type: String,
    label: "Low Stock Alert"
  },

  // UnitOfMeasureName
  unitOfMeasureName: {
    type: String,
    label: "Unit Of Measure",
    autoform: {
      type: "select",
      options: [
        {
          label: "Each (ea)",
          value: "Each"
        },
        {
          label: "Ounces (oz)",
          value: "Ounces"
        },
        {
          label: "Pounds (lb)",
          value: "Pounds"
        },
        {
          label: "Grams (g)",
          value: "Grams"
        },
        {
          label: "Milligrams (mg)",
          value: "Milligrams"
        },
        {
          label: "Kilograms (kg)",
          value: "Kilograms"
        },
        {
          label: "Metric Tons (t)",
          value: "Metric Tons"
        },
      ]
    }
  },

  // vendorId
  vendorId: {
    type: String,
    label: "Vendor ID",
    optional: false,
    autoform: {
      type: "hidden",
    }
  },

  // vendorName
  vendorName: {
    type: String,
    label: "Vendor Name",
    optional: false,
    autoform: {
      type: "hidden",
    }
  },

  // Category
  category: {
    type: String,
    label: "Category",
    optional: false,
    autoform: {
      type: "select",
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

  // createdAt
  createdAt: {
    type: Date,
    label: "Created",
    autoform: {
      type: "hidden",
    }
  },

  // LastModified
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
Inventory.attachSchema(InventorySchema);

// methods
Meteor.methods({
  'createInventory': function(inventory) {
    return Inventory.insert(inventory);
  },
  'updateInventory': function(id, inventory) {
    return Inventory.update({_id:id}, inventory);
  },
  'deleteInventory': function(id) {
    return Inventory.remove({_id: id});
  }
});
