import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Jobs = new Meteor.Collection("jobs");

// rules
Jobs.allow({
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

// product
JobProductsSchema = new SimpleSchema({
  // id
  _id: {
    type: String,
    label: "ID",
    autoValue: function() {
        return Random.id();
    }
  },

  // barCode
  barCode: {
    type: String,
    label: "Bar Code"
  },

  // image
  image: {
    type: String,
    label: "Image"
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

  deleted: {
    type: Boolean,
    optional: true,
    label: "Deleted",
  },
});

// Notes
JobsNoteSchema = new SimpleSchema({
  // id
  _id: {
    type: String,
    label: "ID",
    autoValue: function() {
        return Random.id();
    }
  },

  // note
  note: {
    type: String,
    label: "Note",
    autoform: {
      type: "textarea",
    }
  },

  // customerView
  customerView: {
    type: Boolean,
    label: "Customer Can View",
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



  deleted: {
    type: Boolean,
    optional: true,
    label: "Deleted",
  },
});

// schema
JobsSchema = new SimpleSchema({
  // customerId
  customerId: {
    type: String,
    label: "Customer ID",
    autoform: {
      type: "hidden",
    }
  },

  // customerName
  customerName: {
    type: String,
    label: "Customer Name",
    autoform: {
      type: "hidden",
    }
  },

  // jobStatus
  jobStatus: {
    type: String,
    label: "Status",
    autoform: {
      type: "select",
    }
  },

  // jobStartDate
  jobStartDate: {
    type: Date,
    label: "Start Date",
    autoform: {
      type: "datetime-local",
    }
  },

  // jobExpectedCompleteDate
  jobExpectedCompleteDate: {
    type: Date,
    label: "Expected Complete Date",
    autoform: {
      type: "datetime-local",
    }
  },

  // jobCompleteDate
  jobCompleteDate: {
    type: Date,
    label: "Actual Complete Date",
    optional: true,
    autoform: {
      type: "datetime-local",
    }
  },

  // jobName
  jobName: {
    type: String,
    label: "Job Name",
  },

  // jobDescription
  jobDescription: {
    type: String,
    label: "Job Description",
    autoform: {
      type: "textarea",
    }
  },

  // jobTerms
  jobTerms: {
    type: String,
    label: "Payment Terms",
    autoform: {
      type: "textarea",
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

  // externalReporting
  externalReporting: {
    type: Boolean,
    label: "External Reporting",
  },

  // notes
  jobNotes: {
    type: Array,
    optional: true
  },

  'jobNotes.$': JobsNoteSchema,

  // products
  jobProducts: {
    type: Array,
    optional: true
  },

  'jobProducts.$': JobProductsSchema,
});


// attach
Jobs.attachSchema(JobsSchema);

// methods
Meteor.methods({
  // create
  jobCreate: function(jobEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Jobs.insert(jobEntity);
  },

  // update
  jobUpdate: function(jobId, jobEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Jobs.update({_id: jobId}, jobEntity);
  },

  // delete
  jobDelete: function(jobId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    Jobs.remove({_id: jobId});
  },

  // jobNoteCreate
  jobNoteCreate: function(jobId, note, customerView) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    var job = Jobs.findOne({_id: jobId});

    // check if we have an array of notes if not create it.
    if(! job.jobNotes) {
      var jobNotes = [];
    } else {
      var jobNotes =job.jobNotes;
    }

    // create new note
    var note = {
      note: note,
      customerView: customerView,
      deleted: false,
    }

    // push into the array
    jobNotes.push(note);

    return Jobs.update({_id: jobId}, {$set: {jobNotes: jobNotes}});
  },

  // jobNote update
  jobNoteUpdate: function(jobId, jobNoteId, note, customerView) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Jobs.update({_id: jobId, 'jobNotes._id': jobNoteId}, {$set: {'jobNotes.$._id': jobNoteId, 'jobNotes.$.note':note, 'jobNotes.$.customerView': customerView, 'jobNotes.$.deleted':false}});
  },

  // jobNoteDelete
  jobNoteDelete: function(jobId, jobNoteId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Jobs.update({_id: jobId, 'jobNotes._id': jobNoteId}, {$set: {'jobNotes.$.deleted': true}});
  },

  // jobProductCreate
  jobProductCreate: function(jobId, barCode, image, quantity, unitOfMeasureName, type) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    // get job
    var job = Jobs.findOne({_id: jobId});

    // if we have no product then create an empty array
    if(! job.jobProducts) {
      var jobProducts = [];
    } else  {
      var jobProducts = job.jobProducts;
    }

    var product = {
      barCode: barCode,
      image: image,
      quantity: quantity,
      unitOfMeasureName: unitOfMeasureName,
      type: type
    };

    jobProducts.push(product);

    return Jobs.update({_id: jobId}, {$set: {jobProducts: jobProducts}});
  },

  // jobProductDelete
  jobProductDelete: function(jobId, jobProductId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Jobs.update({_id: jobId, 'jobProducts._id': jobProductId}, {$set: {'jobProducts.$.deleted': true}});
  },

  // jobTransferCreate
  jobTransferCreate: function(jobId, type, quantity, unitOfMeasureName) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    // get job
    var job = Jobs.findOne({_id: jobId});

    // if we have no product then create an empty array
    if(! job.jobTransfers) {
      var jobTransfers = [];
    } else  {
      var jobTransfers = job.jobTransfers;
    }

    var transfer = {
      type: type,
      quantity: quantity,
      unitOfMeasureName: unitOfMeasureName,
      deleted: false,
    }

    jobTransfers.push(transfer);

    return Jobs.update({_id: jobId}, {$set: {jobTransfers: jobTransfers}});
  },

  // jobTransferEdit
  jobTransferEdit: function(jobId, jobTransferId, type, quantity, unitOfMeasureName) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Jobs.update({_id: jobId, 'jobTransfers._id': jobTransferId}, {$set: {'jobTransfers.$._id': jobTransferId, 'jobTransfers.$.type':type, 'jobTransfers.$.quantity': quantity,  'jobTransfers.$.unitOfMeasureName': unitOfMeasureName, 'jobTransfers.$.deleted':false}});
  },

  // jobTransferDelete
  jobTransferDelete: function(jobId, jobTransferId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Jobs.update({_id: jobId, 'jobTransfers._id': jobTransferId}, {$set: {'jobTransfers.$.deleted': true}});
  }
});
