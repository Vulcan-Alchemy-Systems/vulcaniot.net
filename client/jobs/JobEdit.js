// onCreated
Template.JobEdit.onCreated(function() {
  this.autorun(() => {
    var customerId = FlowRouter.getParam('customerId');
    this.subscribe('singleCustomer', customerId);
    this.subscribe('jobsStatus');
  });
});

// helpers
Template.JobEdit.helpers({
  // job
  job: function() {
    return Session.get('Job');
  },
  // jobStatus
  jobStatus: function() {
    return JobsStatus.find().map(function(values) {
      return {
        label: values.title,
        value: values.value
      };
    });
  }
});

// events
Template.JobEdit.events({
  'click .job-edit-submit': function(event) {
    event.preventDefault();
    var customerId = FlowRouter.getParam('customerId');
    var customer = Customers.findOne({_id: customerId});
    var formData = AutoForm.getFormValues('updateJobForm').updateDoc;

    formData.$set.customerName = customer.name;

    var job = Session.get('Job');

    // call update
    Meteor.call('jobUpdate', job._id, formData, function(error) {
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
          message: 'Updated job #' + job._id
        });

        // reset session
        Session.set('JobEdit', false);
      }
    });
  },
});
