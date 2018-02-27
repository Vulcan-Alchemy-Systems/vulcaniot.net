// onCreated
Template.BugsNotesNew.onCreated(function() {});

// onRendered
Template.BugsNotesNew.onRendered(function() {});

// helpers
Template.BugsNotesNew.helpers({});

// events
Template.BugsNotesNew.events({
  // bugs-notes-new
  'click .bugs-notes-new': function(event) {
    event.preventDefault();
    Session.set('BugsNotesNew', ! Session.get('BugsNotesNew'));
    Session.set('BugsNotesEdit', false);
    Session.set('BugsNotesDelete', false);
  },
  // bugs-notes-new-submit
  'click .bugs-notes-new-submit': function(event) {
    event.preventDefault();

    var bugsId = FlowRouter.getParam('id');

    // set up form
    var formData = AutoForm.getFormValues('bugsNotesInsertForm').insertDoc;

    Meteor.call('bugsNotesCreate', bugsId, formData.note, function(error) {
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
          message: 'Created bug note'
        });

        // reset session
        Session.set('BugsNotesNew', false);
      }
    });
    
    // scroll to top
    $('body').scrollTop(0);
  }
});
