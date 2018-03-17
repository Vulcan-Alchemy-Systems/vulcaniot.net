import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

JobsBatchProcess = new Meteor.Collection("jobsBatchProcess");

// rules
JobsBatchProcess.allow({
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

// JobsBatchProductsSchema
JobsBatchProcessSchema = new SimpleSchema({
  // jobBatchId
  jobsBatchId: {
    type: String,
    label: "Job Batch Id",
    autoform: {
      type: "hidden",
    },
  },

  // device
  device: {
    type: String,
    label: "Device",
    optional: false,
    autoform: {
      type: "select",
    }
  },

  // user
  user: {
    type: String,
    label: "User",
    optional: false,
    autoform: {
      type: "select",
    }
  },

  // type
  type: {
    type: String,
    label: "Process Type",
    optional: false,
    autoform: {
      type: "select",
    }
  },

  // start
  start: {
    type: Date,
    label: "Start Date",
    optional: false,
    autoform: {
      type: "datetime-local",
    }
  },

  // end
  end: {
    type: Date,
    label: "End Date",
    optional: true,
    autoform: {
      type: "datetime-local",
    }
  },

  // note
  note: {
    type: String,
    label: "Notes",
    optional: true,
    autoform: {
      type: "textarea",
    }
  },

  // createdAt
  createdAt: {
    type: Date,
    label: "Created At",
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
});

// attach
JobsBatchProcess.attachSchema(JobsBatchProcessSchema);

// methods
Meteor.methods({
  // jobsBatchProcessCreate
  jobsBatchProcessCreate: function(jobsBatchId, deviceId, userId, type, start, end, note) {
    var result = JobsBatchProcess.insert({
      jobsBatchId: jobsBatchId,
      deviceId: deviceId,
      userId: userId,
      type: type,
      start: start,
      end: end,
      note: note
    });

    return result;
  },

  // jobsBatchProcessUpdate
  jobsBatchProcessUpdate: function(_id, jobsBatchId, deviceId, userId, type, start, end, note) {
      var result = JobsBatchProcess.update(id, {$set: {
        jobsBatchId: jobsBatchId,
        deviceId: deviceId,
        userId: userId,
        type: type,
        start: start,
        end: end,
        note: note
      }});

      return result;
  },

  // jobsBatchProcessDelete
  jobsBatchProcessDelete: function(_id) {
    var result = JobsBatchProcess.remove({_id: id});

    return result;
  }
});
