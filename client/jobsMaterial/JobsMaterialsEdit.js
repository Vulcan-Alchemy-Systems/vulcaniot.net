// onCreated
Template.JobsMaterialsEdit.onCreated(function() {
  this.autorun(() => {
    var customerId = FlowRouter.getParam('customerId');
    var jobId = FlowRouter.getParam('jobId');
    this.subscribe('singleCustomer', customerId);
    this.subscribe('singleJob', jobId);
  });
});

// helpers
Template.JobsMaterialsEdit.helpers({
  // JobMaterials
  JobMaterial: function() {
    var JobMaterial = Session.get('JobsMaterial');
    return JobMaterial;
  }
});


// events
Template.JobsMaterialsEdit.events({
  'click .jobs-materials-edit-submit': function(event) {
    event.preventDefault();

    var customerId = FlowRouter.getParam('customerId');
    var jobId = FlowRouter.getParam('jobId');
    var JobMaterial = Session.get('JobsMaterial');

    // set up form
    var formData = AutoForm.getFormValues('updateJobsMaterialsForm').updateDoc.$set;

    Meteor.call('JobsMaterialsUpdate', JobMaterial._id, jobId, formData.barCode, formData.type, formData.quantity, formData.unitOfMeasureName, formData.description, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        $('body').scrollTop(0);
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Material has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Updated job material'
        });

        // clear bar code mapping from original barCode
        Meteor.call('barCodeRemove', JobMaterial.barCode, function(error, result) {
          if(error) {
            $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
            $('body').scrollTop(0);
          }
        });

        // map bar code for searching
        Meteor.call('barCodeCreate', formData.barCode, "Product Material", "/customers/"+customerId+"/job/"+jobId+"?tab=materials", function(error, result) {
          if(error) {
            $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
            $('body').scrollTop(0);
          }
        });

        // reset session
        Session.set('JobsMaterialsEdit', false);

        $('body').scrollTop(0);
      }
    });
  },
});
