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

JobProductsSchema = new SimpleSchema({
  // ProductName
  productName: {
    type: String,
    label: "Product Name"
  },

  // PackageType
  packageType: {
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
  }
});

JobsNoteSchema = new SimpleSchema({
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

// schema
JobsSchema = new SimpleSchema({
  // customerId
  customerId: {
    type: String,
    label: "Customer",
    autoform: {
      type: "hidden",
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

  //externalReporting
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
  }
});
