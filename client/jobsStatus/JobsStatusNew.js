// events
Template.JobsStatusNew.events({
  // jobs-status-new-submit
  'click .jobs-status-new-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('jobsStatusInsertForm').insertDoc;

    // call jobsStatusCreate
    Meteor.call('jobsStatusCreate', formData.title, formData.value, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        $('body').scrollTop(0);
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Status has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created job status'
        });

        // reset session
        Session.set('JobsStatusNew', false);
      }
    });
  }
});
