// onCreated
Template.JobsBatchTypeEdit.onCreated(function() {
  this.autorun(() => {
    var id = Session.get('JobsBatchTypeId');
    this.subscribe('singleJobsBatchType', id);
  });
});

// helpers
Template.JobsBatchTypeEdit.helpers({
  jobsBatchTypes: function() {
    var id = Session.get('JobsBatchTypeId');
    var result = JobsBatchType.findOne({_id: id});
    console.log(id);
    return result;
  }
});

// events
Template.JobsBatchTypeEdit.events({
  'click .jobs-batch-type-edit-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('updateJobsBatchTypeForm').updateDoc.$set;

    var id = Session.get('JobsBatchTypeId');

    Meteor.call('jobsBatchTypeUpdate', id, formData.title, formData.value, function(error, result){
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else  {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Batch Type has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Updated job batch type #' + result
        });

        // reset session
        Session.set('JobsBatchTypeEdit', false);
      }
    });
    
    $('body').scrollTop(0);
  }
});
