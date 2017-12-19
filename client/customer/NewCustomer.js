// events
Template.NewCustomer.events({
  'click .new-customer-submit': function(event) {
    var formData = AutoForm.getFormValues('insertCustomerForm');

    // call update
    Meteor.call('createCustomer',
      formData.insertDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Customer was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created customer'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('NewCustomer', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
