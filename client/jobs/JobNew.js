// helpers
Template.JobNew.helpers({
});

Template.JobNew.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

// events
Template.JobNew.events({
  'click .job-new-submit': function(event) {
    event.preventDefault();
    
    var formData = AutoForm.getFormValues('insertJobForm').insertDoc;
    var jobStartDate = $('#jobStartDate').val();
    var jobExpectedCompleteDate = $('#jobExpectedCompleteDate').val();
    var jobCompleteDate = $('#jobCompleteDate').val();

    formData.jobStartDate = jobStartDate;
    formData.jobExpectedCompleteDate = jobExpectedCompleteDate;
    formData.jobCompleteDate = jobCompleteDate;
    formData.createdBy = Meteor.userId();
    formData.createdByName = Meteor.user().profile.name;
    formData.createdAt = new Date();
    formData.customerId = Session.get('CustomerId');

    // call update
    Meteor.call('jobCreate', formData, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created job #'
        });

        // reset session
        Session.set('JobNew', false);
      }
    });
  }
});
