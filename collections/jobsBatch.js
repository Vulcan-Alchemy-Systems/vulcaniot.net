import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

JobsBatch = new Meteor.Collection("jobsBatch");

// rules
JobsBatch.allow({
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
JobsBatchSchema = new SimpleSchema({
  // jobId
  jobId: {
    type: String,
    label: "Job Id",
    autoform: {
      type: "hidden",
    },
  },

  // barcode
  barcode: {
    type: String,
    label: "Barcode",
  },

  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
    }
  },

  // start
  start: {
    type: Date,
    label: "Start Date",
    optional: true,
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
JobsBatch.attachSchema(JobsBatchSchema);

// methods
Meteor.methods({
  // jobsBatchCreate
  jobsBatchCreate: function(jobId, barcode, type, start, end) {
    var result = JobsBatch.insert({
      jobId: jobId,
      barcode: barcode,
      type: type,
      start: start,
      end: end
    });

    return result;
  },

  // jobsBatchUpdate
  jobsBatchUpdate: function(_id, jobId, barcode, type, start, end) {
    var result = JobsBatch.update(id, {$set: {
      jobId: jobId,
      barcode: barcode,
      type: type,
      start: start,
      end: end
    }});

    return result;
  },

  // jobsBatchDelete
  jobsBatchDelete: function(_id) {
    var result = JobsBatch.remove({_id: id});

    return result;
  }
});
