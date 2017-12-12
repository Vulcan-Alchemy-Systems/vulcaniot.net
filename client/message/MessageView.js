Template.MessageView.onCreated(function() {
  // if not enabled go back to dashboard
  if(!Meteor.settings.public.features.messages) {
    FlowRouter.go("dashboard");
  }

  // set
  this.autorun(() => {
    this.subscribe('messagesSent');
    this.subscribe("messagesInbox");
    this.subscribe("messagesTrash");
    this.subscribe("singleMessage");
  });
});

// rendered
Template.MessageView.rendered = function() {
  // mark Read
  var id = FlowRouter.getParam('id');
  Meteor.call('messageMarkRead', id, function(error, result) {
    if(error) {
      $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
    } else {
      // record history
      Meteor.call('createHistory', {
        userId: Meteor.userId(),
        message: 'User read message ' + id
      });
    }
  });
};

// helpers
Template.MessageView.helpers({
  message: function() {
    var id = FlowRouter.getParam('id');
    result = Messages.findOne({_id: id});
    return result;
  },
  // inbox count
  inboxCount: function() {
    return Messages.find({toId: Meteor.userId(), deleteFlag: false}).count();
  },
  // sent count
  sentCount: function() {
    return Messages.find({fromId: Meteor.userId(), deleteFlag: false}).count();
  },
  // trash count
  trashCount: function() {
    return Messages.find({toId: Meteor.userId(), deleteFlag: true}).count();
  },
  // long date
  dateLongFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
  canEdit: function(toId, deleteFlag) {
    if(toId == Meteor.userId() && deleteFlag == false) {
      return true;
    } else {
      return false;
    }
  }
});

// events
Template.MessageView.events({
  'click .message-trash': function (event) {
    var id = FlowRouter.getParam('id');
    Meteor.call('messagesDelete', id, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        // record history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'User trashed message ' + id
        });
        FlowRouter.go('messages');
      }
    });
  },
  // compose clicked
  'click .compose-message': function(event) {
    Session.set('composeMessage', true);
    Session.set('messageUserId', FlowRouter.getParam('id'));
    FlowRouter.go('messages');
  },
  // reply
  'click .message-reply': function(event) {
    var id = FlowRouter.getParam('id');
    message = Messages.findOne({_id: id});
    Session.set('composeMessage', true);
    Session.set('replyMessageId', id);
    Session.set('messageUserId', message.fromId);
    FlowRouter.go('messages');
  },
  // forward
  'click .message-forward': function(event) {
    var id = FlowRouter.getParam('id');
    Session.set('composeMessage', true);
    Session.set('replyMessageId', id);
    FlowRouter.go('messages');
  },
});

// router
FlowRouter.route('/profile/messages/view/:id', {
  name: 'messagesView',
  parent: 'messages',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'MessageView'});
  },
});
