Meteor.publish("tasks", function() {
  return Tasks.find({author: this.userId});
});

Meteor.publish("singleTask", function(id) {
  return Tasks.find({_id: id});
});
