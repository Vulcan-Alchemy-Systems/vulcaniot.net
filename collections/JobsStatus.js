import SimpleSchema from 'simpl-schema';

JobsStatus = new Meteor.Collection("jobsStatus");

// autoforms
SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

// rules
JobsStatus.allow({
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

JobStatusSchema = new SimpleSchema({
  // Title
  title: {
    type: String,
    label: "Title"
  },

  // value
  value: {
    type: String,
    label: "Value"
  },
});


// attach
JobsStatus.attachSchema(JobStatusSchema);

// methods
Meteor.methods({
  // jobsStatusCreate
  jobsStatusCreate: function(title, value) {
    var result = JobsStatus.insert({
      title: title,
      value: value
    });

    return result;
  },
  // jobsStatusUpdate
  jobsStatusUpdate: function(id, title, value) {
    var result = JobsStatus.update(id, {$set: {
      title: title,
      value: value
    }});

    return result;
  },
  // jobsStatusDelete
  jobsStatusDelete: function(id) {
    JobsStatus.remove({_id:id});
  }
});
