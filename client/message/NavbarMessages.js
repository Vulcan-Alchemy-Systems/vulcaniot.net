// on created
Template.NavbarMessages.onCreated(function() {
  
});

Template.NavbarMessages.helpers({
  // gets all active tasks counts
  messageCount: function() {
    return Messages.find({}).count();
  },
  // get active tasks
  messageList: function() {
    return Message.find({author: Meteor.userId(), completed: false});
  }
});
