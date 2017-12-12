Meteor.publish("messagesInbox", function() {
  return Messages.find({toId: this.userId, deleteFlag: false});
});

Meteor.publish("messagesSent", function() {
  return Messages.find({fromId: this.userId, deleteFlag: false});
});

Meteor.publish("messagesTrash", function() {
  return Messages.find({toId: this.userId, deleteFlag: true});
});

Meteor.publish("singleMessage", function(id) {
  return Messages.findOne({_id: id});
});
