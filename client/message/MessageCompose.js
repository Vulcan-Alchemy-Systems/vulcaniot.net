Template.MessageCompose.onCreated(function() {
  this.autorun(() => {
    if(Session.get('messageUserId')) {
      this.subscribe('singleUser', Session.get('messageUserId'));
    }
    if(Session.get('replyMessageId')) {
      this.subscribe('singleMessage', Session.get('replyMessageId'));
    }
  });

});

// rendered
Template.MessageCompose.rendered = function(){
  Meteor.typeahead.inject();
};


// helpers
Template.MessageCompose.helpers({
  getUsers: function() {
    return Meteor.users.find().fetch().map(function(it){ return it.name; });
  },
  // get to name
  getToName: function() {
    // if we have a message user
    if(Session.get('messageUserId')) {
      var userEntity = Meteor.users.findOne({_id: Session.get('messageUserId')});
      // if we have a user
      if(userEntity) {
        return userEntity.profile.name;
      }
    }
  },
  // get To Id
  getToId: function() {
    return Session.get('messageUserId');
  },
  // get from name
  getFromName: function() {
    var userEntity = Meteor.user();
    // if we have a user
    if(userEntity) {
      return userEntity.profile.name;
    }
  },
  // get from id
  getFromId: function() {
    return Meteor.userId();
  },
  // reply
  getSubject: function() {
    if(Session.get('replyMessageId')) {
      message = Messages.findOne({_id: Session.get('replyMessageId')});
      if(message) {
        return 'RE: ' + message.subject;
      }
    }
  },
  // getBody
  getBody: function() {
    if(Session.get('replyMessageId')) {
      message = Messages.findOne({_id: Session.get('replyMessageId')});
      if(message) {
        return '\n----------------------------------------------------------------------------------\nOn ' + moment(message.createdDate).format(Meteor.settings.public.longDate) + ' ' + message.fromName + ' wrote:\n' + message.body;
      }
    }
  },
  getDate: function() {
    return new Date();
  }
});
