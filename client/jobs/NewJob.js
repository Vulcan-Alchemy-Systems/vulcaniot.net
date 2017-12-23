// helpers
Template.NewJob.helpers({
});

// events
Template.NewJob.events({
  'click .new-job-submit': function(event) {
    var formData = AutoForm.getFormValues('insertJobForm').insertDoc;
    var id = FlowRouter.getParam('id');
    formData.createdBy = Meteor.userId();
    formData.createdByName = Meteor.user().profile.name;
    formData.createdAt = new Date();
    formData.customerId = id;

    // call update
    Meteor.call('createJob', formData, function(error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // reset session
        Session.set('NewJob', false);
      }
    });
  }
});
