// onCreated
Template.JobsMaterialsNew.onCreated(function() {
  this.autorun(() => {
    var customerId = FlowRouter.getParam('customerId');
    var jobId = FlowRouter.getParam('jobId');
    this.subscribe('singleCustomer', customerId);
    this.subscribe('singleJob', jobId);
  });
});

// events
Template.JobsMaterialsNew.events({
  'click .jobs-materials-new-submit': function(event) {
    event.preventDefault();

    var customerId = FlowRouter.getParam('customerId');
    var jobId = FlowRouter.getParam('jobId');

    // set up form
    var formData = AutoForm.getFormValues('insertJobsMaterialsForm').insertDoc;

    Meteor.call('JobsMaterialsCreate', jobId, formData.barCode, formData.type, formData.quantity, formData.unitOfMeasureName, formData.description, function(error, result) {
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
          message: 'Created job material'
        });

        // map bar code for searching
        Meteor.call('barCodeCreate', formData.barCode, "Product Material", "/customers/"+customerId+"/job/"+jobId+"?tab=materials", function(error, result) {
          if(error) {
            $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
            $('body').scrollTop(0);
          }
        });

        // reset session
        Session.set('JobsMaterialsNew', false);

        $('body').scrollTop(0);
      }
    });
  }
});
