import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Products = new Meteor.Collection("products");

Products.allow({
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

ProductsSchema = new SimpleSchema({
  // Label
  label: {
    type: String,
    label: "Label"
  },

  // jobId
  jobId: {
    type: String,
    label: "Job Id",
    autoform: {
      type: "hidden"
    }
  },

  // PackageType
  packageType: {
    type: String,
    label: "Package Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Product",
          value: "Product"
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
          label: "Hash Oil",
          value: "Hash Oil"
        },
      ]
    }
  },
  // SourceHarvestNames

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
  // ProductName
  productName: {
    type: String,
    label: "Product Name"
  },
  // ProductCategoryName

  // PackagedDate
  PackagedDate: {
    type: Date,
    label: "Packaged Date",
  },

  // InitialLabTestingState

  // LabTestingState

  // LabTestingStateName

  // LabTestingStateDate

  // IsProductionBatch

  // ProductionBatchNumber

  // IsTestingSample

  // IsProcessValidationTestingSample

  // ProductRequiresRemediation

  // ContainsRemediatedProduct

  // RemediationDate
  remediationDate: {
    type: Date,
    label: "Remediation Date",
  },
  // ReceivedFromManifestNumber

  // ReceivedFromFacilityLicenseNumber

  // ReceivedFromFacilityName

  // ReceivedDate
  receivedDate: {
    type: Date,
    label: "Received Date",
  },
  // IsOnHold

  // ArchivedDate
  archivedDate: {
    type: Date,
    label: "Archived Date",
  },
  // FinishedDate
  finishedDate: {
    type: Date,
    label: "Finished Date",
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
Products.attachSchema(ProductsSchema);

// methods
Meteor.methods({
  //update
  'updateProducts': function(id, products) {
    Products.update(id, products);
  },
  // create
  'createProducts': function(products) {
      Products.insert(products);
  },
  // remove
  'removeProducts': function(id) {
    Products.remove({_id: id});
  }
});
