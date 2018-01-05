Template.UserCustomerNew.onCreated(function() {
  this.autorun(() => {
    var customerId = Session.get('CustomerId');
    this.subscribe('singleCustomer', customerId);
  });
});

// helpers
Template.UserCustomerNew.helpers({

});

// events
Template.UserCustomerNew.events({
  // submit new user form
  'click .user-customer-new-submit': function(event) {
    event.preventDefault();

    // customer
    var customerId = Session.get('CustomerId');
    var customerEntity = Customers.findOne({_id: customerId});

    // get form data
    var formData = AutoForm.getFormValues('insertUserForm').insertDoc;

    formData.profile.customerId = customerId
    formData.profile.customerName = customerEntity.name;

    // call update
    Meteor.call('userCustomerCreate',
      formData,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>User has been created.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // reset session
          Session.set('UserVendorNew', false);
        }
      }
    );
  }

});
