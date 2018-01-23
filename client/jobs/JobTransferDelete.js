// created
Template.JobTransferDelete.onCreated(function() {
  this.autorun(() => {
    var jobId = Session.get('JobId');
    this.subscribe('singleJob', jobId);
  });
});

// helpers
Template.JobTransferDelete.helpers({
  // job
  job: function() {
    return Session.get('Job');
  },

  // job transfer
  jobTransfer: function() {
    return Session.get('JobTransfer');
  },
});

// events
Template.JobTransferDelete.events({
  'click .job-transfer-delete-submit': function(event, instance) {
      event.preventDefault();

      var job = Session.get('Job');
      var jobTransfer = Session.get('JobTransfer');

      Meteor.call('jobTransferDelete', job._id, jobTransfer._id, function(error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Transfer was removed.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Job transfer was removed ' + job._id
          });

          $('body').scrollTop(0);

          // reset session
          Session.set('JobTransferDelete', false);
        }
      });
    }
  });
