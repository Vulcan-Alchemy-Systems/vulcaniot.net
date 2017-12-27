// created
Template.VendorEdit.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleVendor', id);
  });
});

// rendered
Template.VendorEdit.rendered = function(){

};

// helpers
Template.VendorEdit.helpers({
  vendor: function() {
    var id = FlowRouter.getParam('id');
    result = Vendors.findOne({_id: id});
    Session.set('VendorData', result);
    return result;
  },
});

// events
Template.VendorEdit.events({
  'click .edit-vendor-submit': function(event) {
    event.preventDefault();
    var formData = AutoForm.getFormValues('updateVendorForm');
    var vendorData = Session.get('VendorData');

    // call update
    Meteor.call('updateVendor',
      vendorData._id, formData.updateDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Vendor was saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated vendor ' + vendorData.name
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // set edit to false
          Session.set('VendorEdit', false);
        }
      }
    );
  }
});
