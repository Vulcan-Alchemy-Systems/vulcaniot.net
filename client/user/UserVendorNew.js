Template.UserVendorNew.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleVendor', id);
  });
});

// helpers
Template.UserVendorNew.helpers({

});

// events
Template.UserVendorNew.events({
  'click .user-vendor-new-submit': function(event) {
    event.preventDefault();

    // vendor
    var vendorId = FlowRouter.getParam('id');
    var vendorEntity = Vendors.findOne({_id: vendorId});

    // get form data
    var formData = AutoForm.getFormValues('insertUserForm').insertDoc;

    formData.profile.vendorId = vendorId;
    formData.profile.vendorName = vendorEntity.name;

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
          Session.set('UserCustomerNew', false);
        }
      }
    );
  }
});
