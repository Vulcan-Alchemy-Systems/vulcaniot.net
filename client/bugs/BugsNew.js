// onCreated
Template.BugsNew.onCreated(function() {

});

// onRendered
Template.BugsNew.onRendered(function() {});

// helpers
Template.BugsNew.helpers({});

// events
Template.BugsNew.events({
  'click .bugs-new-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('bugsInsertForm').insertDoc;

    // call create
    Meteor.call('bugsCreate', formData.title, formData.description, '', 'New', formData.priority, formData.severity, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {

        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Bug has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created bug'
        });

        // loop though all the users in the bug role and create a notice
        var bugsUsers = Roles.getUsersInRole('bug').fetch();
        if(bugsUsers){
          bugsUsers.forEach(function(user){
            Meteor.call('noticesCreate', "Info", "Bug Created", "New bug submitted");
          });
        }

        // reset session
        Session.set('BugsNew', false);
      }

      // scroll to top
      $('body').scrollTop(0);
    });
  },
});
