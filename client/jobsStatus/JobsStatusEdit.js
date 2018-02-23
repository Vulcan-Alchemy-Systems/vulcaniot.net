// helpers
Template.JobsStatusEdit.helpers({
  // jobStatus
  jobStatus: function() {
    return Session.get('JobsStatus');
  }
});

// events
Template.JobsStatusEdit.events({
  'click .jobs-status-edit-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('jobsStatusUpdateForm').updateDoc.$set;
    var jobStatus = Session.get('JobsStatus');

    // call jobsStatusCreate
    Meteor.call('jobsStatusUpdate', jobStatus._id, formData.title, formData.value, function(error, result) {
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
          message: 'Edit job status'
        });

        // reset session
        Session.set('JobsStatusEdit', false);
      }
    });
  }
});
