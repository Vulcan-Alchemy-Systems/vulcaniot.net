Meteor.publish("messages", function() {
  return Messages.find({author: this.userId});
});

Meteor.publish("singleMessage", function(id) {
  return Messages.find({_id: id});
});
