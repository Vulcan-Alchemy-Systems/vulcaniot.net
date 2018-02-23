// created
Template.JobTransferEdit.onCreated(function() {
  this.autorun(() => {
    var jobId = Session.get('JobId');
    this.subscribe('singleJob', jobId);
  });
});

// on rendered
Template.JobTransferEdit.onRendered(function() {
  var jobTransfer = Session.get('JobTransfer');
  $('#type').val(jobTransfer.type);
  $('#quantity').val(jobTransfer.quantity);
  $('#unitOfMeasureName').val(jobTransfer.unitOfMeasureName);
});


Template.JobTransferEdit.helpers({
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
Template.JobTransferEdit.events({
  'click .job-transfer-edit-submit': function(event, instance) {
      event.preventDefault();

      var job = Session.get('Job');
      var jobTransfer = Session.get('JobTransfer');

      var quantity = instance.$('#quantity').val();
      var unitOfMeasureName = instance.$('#unitOfMeasureName').val();
      var type = instance.$('#type').val();

      // call update
      Meteor.call('jobTransferEdit', job._id, jobTransfer._id, type, quantity, unitOfMeasureName, function(error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Transfer has been saved.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Added job transfer to job ' + job._id
          });

          // reset session
          Session.set('JobTransferEdit', !Session.get('JobTransferEdit'));
        }
      });
    }

  });
