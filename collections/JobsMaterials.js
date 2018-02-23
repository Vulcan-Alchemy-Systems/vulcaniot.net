import SimpleSchema from 'simpl-schema';

JobsMaterials = new Meteor.Collection("jobsMaterials");

// autoforms
SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

// rules
JobsMaterials.allow({
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
JobMaterialSchema = new SimpleSchema({
  // jobId
  jobId: {
    type: String,
    label: "Job Id",
    autoform: {
      type: "hidden",
    },
  },

  // barCode
  barCode: {
    type: String,
    label: "Bar Code"
  },

  description: {
    type: String,
    label: "Description",
    optional: true,
    autoform: {
      type: "textarea",
    }
  },

  // type
  type: {
    type: String,
    label: "Product Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Flower",
          value: "Flower"
        },
        {
          label: "Trim",
          value: "Trim"
        },
        {
          label: "Mixed",
          value: "Mixed"
        },
      ]
    }
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
});

// attach
JobsMaterials.attachSchema(JobMaterialSchema);

// methods
Meteor.methods({
  // JobsMaterialsCreate
  JobsMaterialsCreate: function(jobId, barCode, type, quantity, unitOfMeasureName, description) {
    var result = JobsMaterials.insert({
      jobId: jobId,
      barCode: barCode,
      type: type,
      quantity: quantity,
      unitOfMeasureName: unitOfMeasureName,
      description: description
    });
    return result;
  },

  // JobsMaterialsUpdate
  JobsMaterialsUpdate: function(JobsMaterialsId, jobId, barCode, type, quantity, unitOfMeasureName, description) {
      var result = JobsMaterials.update(JobsMaterialsId, {$set: {
        jobId: jobId,
        barCode: barCode,
        type: type,
        quantity: quantity,
        unitOfMeasureName: unitOfMeasureName,
        description: description
      }});
      return result;
  },

  // JobsMaterialsRemove
  JobsMaterialsRemove: function(JobsMaterialsId) {
    JobsMaterials.remove({_id:JobsMaterialsId});
  }
});
