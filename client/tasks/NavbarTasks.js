// on created
Template.NavbarTasks.onCreated(function() {
  var self = this;
  // subscribe
  self.autorun(function() {
    self.subscribe("tasks");
  });
});

Template.NavbarTasks.helpers({
  // gets all active tasks counts
  taskCount: function() {
    return Tasks.find({author: Meteor.userId(), completed: false}).count();
  },
  // get active tasks
  taskList: function() {
    return Tasks.find({author: Meteor.userId(), completed: false});
  }
});
