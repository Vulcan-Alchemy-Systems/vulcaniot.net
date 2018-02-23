// helpers
Template.JobsStatusDelete.helpers({
  // jobStatus
  jobStatus: function() {
    return Session.get('JobsStatus');
  }
});

// events
Template.JobsStatusDelete.events({
  'click .jobs-status-delete-submit': function(event) {
    event.preventDefault();

    var jobStatus = Session.get('JobsStatus');

    // call jobsStatusCreate
    Meteor.call('jobsStatusDelete', jobStatus._id, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        $('body').scrollTop(0);
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Status has been removed.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Delete job status'
        });

        // reset session
        Session.set('JobsStatusDelete', false);
      }
    });
  }
});
