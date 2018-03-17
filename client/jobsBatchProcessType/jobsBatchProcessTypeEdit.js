Template.JobsBatchProcessTypeEdit.onCreated(function() {
  this.autorun(() => {
  });
});

// helpers
Template.JobsBatchProcessTypeEdit.helpers({
  jobsBatchProcessType: function() {
    var id = Session.get('JobsBatchProcessTypeId');
    var result = JobsBatchProcessType.findOne({_id: id});
    return result;
  }
});

// events
Template.JobsBatchProcessTypeEdit.events({
  'click .jobs-batch-process-type-edit-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('updateJobsBatchProcessTypeForm').updateDoc.$set;

    var id = Session.get('JobsBatchProcessTypeId');

    Meteor.call('jobsBatchProcessTypeUpdate', id, formData.title, formData.value, function(error, result) {
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
        Session.set('JobsBatchProcessTypeEdit', false);
      }
    });

    $('body').scrollTop(0);
  }
})
