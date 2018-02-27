// onCreated
Template.BugsNotesEdit.onCreated(function() {});

// helpers
Template.BugsNotesEdit.helpers({
  bugsNotes: function() {
    return Session.get('BugsNote');
  }
});

// events
Template.BugsNotesEdit.events({
  // bugs-notes-edit
  'click .bugs-notes-edit': function(event) {
    event.preventDefault();
    Session.set('BugsNotesEdit', ! Session.get('BugsNotesEdit'));
  },
  // bugs-notes-edit-submit
  'click .bugs-notes-edit-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('bugsNotesUpdateForm').updateDoc.$set;
    var bugsNote = Session.get('BugsNote');

    Meteor.call('bugsNotesUpdate', bugsNote._id, bugsNote.bugsId, formData.note, function(error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Note has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Edited bug note ' + bugsNote._id
        });

        // reset session
        Session.set('BugsNotesEdit', false);
      }

      // scroll to top
      $('body').scrollTop(0);
    });
  }
});
