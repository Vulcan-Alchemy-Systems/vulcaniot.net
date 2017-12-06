// on created
Template.Tasks.onCreated(function() {
  var self = this;

  // if not enabled go back to dashboard
  if(!Meteor.settings.public.features.messages) {
    FlowRouter.go("dashboard");
  }

  // subscribe
  self.autorun(function() {
    self.subscribe("messages");
  });

  this.composeMessage = new ReactiveVar(false);
});


// rendered
Template.MessageList.rendered = function(){

};

// helpers
Template.MessageList.helpers({
  messages: function() {
    return Session.get('messages');
  },
  messageCount: function() {
    return Meteor.call('messages.count');
  }
});

// events
Template.MessageList.events({
  // compose-message
  'click .compose-message': function() {
    Session.set('composeMessage', true);
  },
  'click .compose-message-cancel': function() {
    Session.set('composeMessage', false);
  },
  'click .compose-message-send': function() {
    Session.set('composeMessage', false);
  },
  'click .compose-message-draft': function() {
    Session.set('composeMessage', false);
  }
});

// router
FlowRouter.route('/profile/messages', {
  name: 'messages',
  parent: 'profile',
  title: 'Messages',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'MessageList'});
  },
});
