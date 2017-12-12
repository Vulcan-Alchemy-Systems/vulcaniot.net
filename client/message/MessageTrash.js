Template.MessageTrash.onCreated(function() {
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
Template.MessageTrash.rendered = function() {

};

// helpers
Template.MessageTrash.helpers({
  messages: function() {
    var results = Messages.find({toId: Meteor.userId(), deleteFlag: true}, {"sort" : [['createdDate', 'desc']]}).fetch();
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
  // long date
  dateLongFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
});


// events
Template.MessageTrash.events({
  // check all
  'click .checkbox-toggle': function(event) {
    var checkBoxes = $("input[name=doTrash\\[\\]]");
    checkBoxes.prop("checked", !checkBoxes.prop("checked"));
  },
  // undo trash
  'click .undo-trash': function(event) {
    var selected = [];
    $('#messageTable input:checked').each(function() {
        var id = $(this).val();
        Meteor.call('messagesUnDelete', id, function(error, result) {
          if(error) {
            $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
          } else {
            // record history
            Meteor.call('createHistory', {
              userId: Meteor.userId(),
              message: 'User trashed message ' + id
            });
            // set alert
            $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-info-circle"></i> Messages where un-trashed</div>');
          }
        });
    });

    // auto dismis
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });
  },
  // compose clicked
  'click .compose-message': function(event) {
    Session.set('composeMessage', true);
    FlowRouter.go('messages');
  }
});

// router
FlowRouter.route('/profile/messages/trash', {
  name: 'messagesTrash',
  parent: 'messages',
  title: 'Trash',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'MessageTrash'});
  },
});
