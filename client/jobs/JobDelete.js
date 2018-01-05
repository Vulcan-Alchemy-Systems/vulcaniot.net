Template.JobDelete.onCreated(function() {
  this.autorun(() => {
    var jobId = Session.get('JobId');
    var customerId = Session.get('customerId');
    this.subscribe('singleCustomer', customerId);
    this.subscribe('singleJob', jobId);
  });
});

// helpers
Template.JobDelete.helpers({
  // job entity
  job: function() {
    var jobId = Session.get('JobId');
    var jobEntity = Jobs.findOne({_id: jobId});
    return jobEntity;
  }
});

// events
Template.JobDelete.events({
  'click .job-delete-submit': function(event) {
      event.preventDefault();

      var jobId = Session.get('JobId');

      Meteor.call('jobDelete', jobId, function(error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job has been deleted.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Delete job #' + jobId
          });

          // reset session
          Session.set('JobDelete', false);
          Session.set('JobView', false);
          Session.set('JobId', null);

        }
      });
  }
});
