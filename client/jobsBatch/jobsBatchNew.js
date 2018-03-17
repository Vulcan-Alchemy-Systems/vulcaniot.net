// onCreated
Template.JobsBatchNew.onCreated(function() {
  this.autorun(() => {
    var jobId = FlowRouter.getParam('jobId');
    this.subscribe('singleJob', jobId);
    this.subscribe('allActiveJobsBatchTypes');
  });
});

// helpers
Template.JobsBatchNew.helpers({
  jobsBatchTypes: function() {
    return JobsBatchType.find().map(function(values) {
      return {
        label: values.title,
        value: values.value
      };
    });
  }
});

// events
Template.JobsBatchNew.events({
  'click .jobs-batch-new-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('insertJobsBatchForm').insertDoc;

    var jobId = FlowRouter.getParam('jobId');

    Meteor.call('jobsBatchCreate', jobId, formData.barcode, formData.type, formData.start, formData.end, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Batch has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created job batch  #' + result
        });

        // reset session
        Session.set('JobsBatchNew', false);
      }
    });

    $('body').scrollTop(0);
  }
});
