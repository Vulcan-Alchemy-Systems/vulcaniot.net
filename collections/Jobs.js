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
  createJob: function(job) {
    return Jobs.insert(job);
  },
  updateJob: function(id, job) {
    return Jobs.update({_id:id}, job);
  },
  deleteJob: function(id) {

  }
});
