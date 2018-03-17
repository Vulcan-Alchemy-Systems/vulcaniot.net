import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

JobsBatchProcessType = new Meteor.Collection("jobsBatchProcessType");

// rules
JobsBatchProcessType.allow({
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

// JobsBatchProcessTypeSchema
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
  // jobsBatchTypeCreate
  jobsBatchProcessTypeCreate: function(title, value) {
    var result = JobsBatchProcessType.insert({
      title: title,
      value: value
    });

    return result;
  },

  // jobsBatchTypeUpdate
  jobsBatchProcessTypeUpdate: function(id, title, value) {
    var result = JobsBatchProcessType.update(id, {$set: {
      title: title,
      value: value
    }});

    return result;
  },

  // jobsBatchTypeDelete
  jobsBatchProcessTypeDelete: function(id) {
    var result = JobsBatchProcessType.remove({_id: id});

    return result;
  }
});
