// onCreated
Template.BugsNotesDelete.onCreated(function() {});

// helpers
Template.BugsNotesDelete.helpers({
  bugsNotes: function() {
    return Session.get('BugsNote');
  }
});

// events
Template.BugsNotesDelete.events({
  // bugs-notes-delete
  'click .bugs-notes-delete': function(event) {
    event.preventDefault();
    Session.set('BugsNote', this);
    Session.set('BugsNotesDelete', ! Session.get('BugsNotesDelete'));
    Session.set('BugsNotesEdit', false);
    Session.set('BugsNotesNew', false);
  },
  // bugs-notes-delete-submit
  'click .bugs-notes-delete-submit': function(event) {
    event.preventDefault();

    var bugsNotes = Session.get('BugsNote');
    Meteor.call('bugsNotesDelete', bugsNotes._id, function(error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Note has been deleted.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Delete bug note#' + bugsNotes._id
        });

        // reset session
        Session.set('BugsNotesDelete', false);
      }

      // scroll to top
      $('body').scrollTop(0);
    });
  }
});
