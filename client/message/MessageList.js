
Template.MessageList.onCreated(function() {
  // if not enabled go back to dashboard
  if(!Meteor.settings.public.features.messages) {
    FlowRouter.go("dashboard");
  }

  this.autorun(() => {
    this.subscribe('messagesSent');
    this.subscribe("messagesInbox");
    this.subscribe("messagesTrash");
  });

  this.composeMessage = new ReactiveVar(false);
});

// rendered
Template.MessageList.rendered = function() {

};

// helpers
Template.MessageList.helpers({
  messages: function() {
    var results = Messages.find({toId: Meteor.userId(), deleteFlag: false}, {"sort" : [['createdDate', 'desc']]}).fetch();
    return results;
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
  // returns star
  isStared: function(starFlag) {
    if(starFlag == true) {
      return '<i class="fa fa-star text-yellow"></i>';
    } else {
      return '<i class="fa fa-star-o"></i>';
    }
  },
  // sets subject to bold if it has not been read
  isRead: function(subject, readFlag) {
    if(readFlag) {
      return subject;
    } else {
      return '<b>' + subject + '</b>';
    }
  },
  // long date
  dateLongFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
});

// events
Template.MessageList.events({
  // compose-message
  'click .compose-message': function() {
    Session.set('composeMessage', true);
  },
  // cancel message
  'click .compose-message-cancel': function() {
    Session.set('composeMessage', false);
    Session.set('messageUserId', null);
    Session.set('replyMessageId', null);
  },
  // trash message
  'click .trash-message': function(event) {
    var selected = [];
    $('#messageTable input:checked').each(function() {
        var id = $(this).val();
        Meteor.call('messagesDelete', id, function(error, result) {
            if(error) {
              $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
            } else {
              // record history
              Meteor.call('createHistory', {
                userId: Meteor.userId(),
                message: 'User trashed message ' + id
              });
              // set alert
              $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-info-circle"></i> Messages where trashed</div>');
            }
        });
    });
    // auto dismis
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });
  },
  // check all
  'click .checkbox-toggle': function(event) {
    var checkBoxes = $("input[name=doTrash\\[\\]]");
    checkBoxes.prop("checked", !checkBoxes.prop("checked"));
  },
  // message-inbox
  'click .message-inbox': function(event) {
    Session.set('composeMessage', false);
  },
  // mark star
  'click .mailbox-star': function(event) {
    Meteor.call('messagesMarkStar',
      this._id, this.starFlag,
      function(error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        }
    });
  },
  // send message
  'click .compose-message-send': function() {
    var userEntity = Meteor.user();

    // get form values
    var toName = $.trim($('[name=toName]').val());
    var toId = $.trim($('[name=toId]').val());
    var subject = $.trim($('[name=subject]').val());
    var body = $.trim($('[name=body]').val());
    var fromName = userEntity.profile.name;
    var fromId = userEntity._id;
    var createdDate = new Date();
    var readFlag = $.trim($('[name=readFlag]').val());
    var readDate = $.trim($('[name=readFlag]').val());
    var starFlag = $.trim($('[name=starFlag]').val());
    var deleteFlag = $.trim($('[name=deleteFlag]').val());
    var deleteDate = $.trim($('[name=deleteDate]').val());

    Meteor.call('messagesCreate',
      toName, toId, subject, body, fromName, fromId, createdDate, readFlag, readDate, starFlag, deleteFlag, deleteDate,
    function (error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        // unset the session data
        Session.set('composeMessage', false);
        Session.set('messageUserId', null);

        // record history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'User sent message'
        });
      }
    });
  },
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
