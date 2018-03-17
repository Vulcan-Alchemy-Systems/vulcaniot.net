// onCreated
Template.JobsBatchProcessTypeNew.onCreated(function() {
  this.autorun(() => {
  });
});

// helpers
Template.JobsBatchProcessTypeNew.helpers({

});

// events
Template.JobsBatchProcessTypeNew.events({
  'click .jobs-batch-process-type-new-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('insertJobsBatchProcessTypeForm').insertDoc;

    Meteor.call('jobsBatchProcessTypeCreate', formData.title, formData.value, function(error, result) {
      if (error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Batch Process Type has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created job batch process type #' + result
        });

        // reset session
        Session.set('JobsBatchProcessTypeNew', false);
      }
    });

    $('body').scrollTop(0);
  }
});
