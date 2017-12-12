
Template.MessageSent.onCreated(function() {
  this.autorun(() => {
    this.subscribe('messagesSent');
  });
});


// helpers
Template.MessageSent.helpers({
  messages: function() {
    var results = Messages.find({fromId: Meteor.userId(), deleteFlag: false}, {"sort" : [['createdDate', 'desc']]}).fetch();
    return results;
  },
  inboxCount: function() {
    return Messages.find({toId: Meteor.userId(), deleteFlag: false}).count();
  },
  sentCount: function() {
    return Messages.find({fromId: Meteor.userId(), deleteFlag: false}).count();
  },
  trashCount: function() {
    return 0;
  },
  draftsCount: function() {
    return 0;
  },
  // date
  dateLongFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
});


// events
Template.MessageSent.events({
  // compose clicked
  'click .compose-message': function(event) {
    Session.set('composeMessage', true);
    FlowRouter.go('messages');
  }
});

// router
FlowRouter.route('/profile/messages/sent', {
  name: 'messagesSent',
  parent: 'messages',
  title: 'Sent',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'MessageSent'});
  },
});
