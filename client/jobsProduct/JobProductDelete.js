// created
Template.JobProductDelete.onCreated(function() {
  this.autorun(() => {
    var jobId = Session.get('JobId');
    this.subscribe('singleJob', jobId);
  });
});

Template.JobProductDelete.helpers({
  // job
  job: function() {
    return Session.get('Job');
  },

  // job product
  jobProduct: function() {
    return Session.get('JobProduct');
  }
});

// events
Template.JobProductDelete.events({
  'click .job-product-delete-submit': function(event, instance) {
      event.preventDefault();

      var job = Session.get('Job');
      var jobProduct = Session.get('JobProduct');

      console.log(jobProduct);
      console.log(job);

      Meteor.call('jobProductDelete', job._id, jobProduct._id, function(error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Product was removed.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Job product was removed ' + job._id
          });

          $('body').scrollTop(0);

          // reset session
          Session.set('JobProductDelete', false);
        }
      });
  }
});
