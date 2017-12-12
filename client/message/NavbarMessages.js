// on created
Template.NavbarMessages.onCreated(function() {
  this.autorun(() => {
    this.subscribe("messagesInbox");
  });
});

Template.NavbarMessages.helpers({
  // gets all active tasks counts
  messageCount: function() {
    return Messages.find({toId: Meteor.userId(), deleteFlag: false, readFlag: false}).count();
  },
  // get active tasks
  messageList: function() {
    return Messages.find({toId: Meteor.userId(), deleteFlag: false, readFlag: false}, {"sort" : [['createdDate', 'desc']], limit: 5});
  },
  // returns num min ago
  timeAgo: function(dateTime) {
    return moment(dateTime).fromNow();
  }
});
