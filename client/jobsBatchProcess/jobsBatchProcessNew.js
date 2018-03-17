// onCreated
Template.JobsBatchProcessNew.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allActiveDevices');
    this.subscribe('allActiveJobsBatchProcessTypes');
  });
});

// helpers
Template.JobsBatchProcessNew.helpers({
  // devices
  devices: function() {
    return Device.find().map(function(values) {
      return {
        label: values.name,
        value: values._id
      };
    });
  },
  jobsBatchProcess: function() {
    return JobsBatchProcessType.find().map(function(values) {
      return {
        label: values.title,
        value: values._id
      };
    });
  },
  users: function() {
    return Meteor.users.find({}).map(function(values) {
      return {
        label: values.title,
        value: values._id
      };
    });
  }
});
