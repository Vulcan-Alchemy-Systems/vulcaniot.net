Template.JobTransferNew.helpers({
  job: function() {
    return Session.get('Job');
  }
});

// events
Template.JobTransferNew.events({
  'click .job-transfer-new-submit': function(event, instance) {
    event.preventDefault();

    var job = Session.get('Job');

    var quantity = instance.$('#quantity').val();
    var unitOfMeasureName = instance.$('#unitOfMeasureName').val();
    var type = instance.$('#type').val();

    // call update
    Meteor.call('jobTransferCreate', job._id, type, quantity, unitOfMeasureName, function(error) {
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
        Session.set('JobTransferNew', !Session.get('JobTransferNew'));
      }
    });
  },


});
