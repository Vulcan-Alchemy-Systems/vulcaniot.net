// onCreated
Template.JobsBatchTypeNew.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allJobsBatchType');
  });
});

// helpers
Template.JobsBatchTypeNew.helpers({

});

// events
Template.JobsBatchTypeNew.events({
  'click .jobs-batch-type-new-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('insertJobsBatchTypeForm').insertDoc;

    Meteor.call('jobsBatchTypeCreate', formData.title, formData.value, function(error, result) {
      if (error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Batch Type has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created job batch type #' + result
        });

        // reset session
        Session.set('JobsBatchTypeNew', false);
      }
    });

    $('body').scrollTop(0);
  }
});
