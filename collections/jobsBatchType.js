import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

JobsBatchProcessType = new Meteor.Collection("jobsBatchProcessType");

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
JobsBatchProcessTypeSchema = new SimpleSchema({
  // title
  title: {
    type: String,
    label: "Title",
    optional: false,
  },

  // value
  value: {
    type: String,
    label: "Value",
    optional: false,
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
JobsBatchProcessType.attachSchema(JobsBatchProcessTypeSchema);

// methods
Meteor.methods({
  // jobsBatchProcessTypeCreate
  jobsBatchProcessTypeCreate: function(title, value) {
    var result = JobsBatchProcessType.insert({
      title: title,
      value: value
    });

    return result;
  },

  // jobsBatchProcessTypeUpdate
  jobsBatchProcessTypeUpdate: function(_id, title, value) {
    var result = JobsBatchProcessType.update(id, {$set: {
      title: title,
      value: value
    }});

    return result;
  },

  // jobsBatchProcessTypeDelete
  jobsBatchProcessTypeDelete: function(_id) {
    var result = JobsBatchProcessType.remove({_id: id});

    return result;
  }
});
