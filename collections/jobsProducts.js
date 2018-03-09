import SimpleSchema from 'simpl-schema';

JobsProducts = new Meteor.Collection("jobsProducts");

// autoforms
SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

// rules
JobsProducts.allow({
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

// WeightSchema
WeightSchema = new SimpleSchema({
  // id
  _id: {
    type: String,
    label: "ID",
    autoValue: function() {
        return Random.id();
    }
  },

  // image
  image: {
    type: String,
    label: "Image"
  },

  // Quantity
  quantity: {
    type: String,
    label: "Quantity"
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

  // createdBy
  createdBy: {
    type: String,
    label: "Created By",
    autoValue: function () {
      return Meteor.userId();
    },
    autoform: {
      type: "hidden",
    }
  },

  // createdByName
  createdByName: {
    type: String,
    label: "Created By Name",
    autoform: {
      type: "hidden",
    },
    autoValue: function () {
      return Meteor.user().profile.name;
    },
  },
});

// JobsProductsSchema
JobsProductsSchema = new SimpleSchema({
  // barCode
  barCode: {
    type: String,
    label: "Bar Code"
  },

  // PackageType
  type: {
    type: String,
    label: "Product Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Other",
          value: "Other"
        },
        {
          label: "Immature Plant",
          value: "Immature Plant"
        },
        {
          label: "Vegetative Plant",
          value: "Vegetative Plant"
        },
        {
          label: "Shatter",
          value: "Shatter"
        },
        {
          label: "Crude",
          value: "Crude"
        },
        {
          label: "Hash Oil",
          value: "Hash Oil"
        },
      ]
    }
  },
});

// attach
JobsProducts.attachSchema(JobsProductsSchema);

// methods
Meteor.methods({});
