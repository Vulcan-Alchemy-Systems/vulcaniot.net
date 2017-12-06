Template.Task.onCreated(function() {
  var self = this;

});

// helpers
Template.Task.helpers({
  // get single Task
  task: function() {
    var taskId = Session.get('taskId');
    return Tasks.find({_id: taskId});
  },
  // date format
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },
  completedFormat: function(completed) {
    if(completed) {
      return "Yes";
    } else {
      return "No";
    }
  }
});

// events
Template.Task.events({
  // submit
  'submit': function() {
    Session.set('editTask', !Session.get('editTask'));
  },

  // edit
  'click .task-edit': function() {
    var taskId = Session.get('taskId');
    Session.set('editTask', !Session.get('editTask'));
  },

  // remove
  'click .task-remove': function() {
    var taskId = Session.get('taskId');
    Meteor.call('deleteTask', taskId);
    Session.set('taskId', null);
    Session.set('viewTask', null);
  },
});
