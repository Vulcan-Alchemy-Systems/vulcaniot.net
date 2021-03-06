import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

JobsBatchType = new Meteor.Collection("jobsBatchType");

// rules
JobsBatchType.allow({
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
JobsBatchTypeSchema = new SimpleSchema({
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
JobsBatchType.attachSchema(JobsBatchTypeSchema);

// methods
Meteor.methods({
  // jobsBatchTypeCreate
  jobsBatchTypeCreate: function(title, value) {
    var result = JobsBatchType.insert({
      title: title,
      value: value
    });

    return result;
  },

  // jobsBatchTypeUpdate
  jobsBatchTypeUpdate: function(id, title, value) {
    var result = JobsBatchType.update(id, {$set: {
      title: title,
      value: value
    }});

    return result;
  },

  // jobsBatchTypeDelete
  jobsBatchTypeDelete: function(id) {
    var result = JobsBatchType.remove({_id: id});

    return result;
  }
});
