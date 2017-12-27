// created
Template.VendorDelete.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleVendor', id);
  });
});

// helpers
Template.VendorDelete.helpers({
  vendor: function() {
    var id = FlowRouter.getParam('id');
    var result = Vendors.findOne({_id: id});
    return result;
  },
});

// events
Template.VendorDelete.events({
  'click .vendor-delete-submit': function(event) {
    event.preventDefault();


  }
});
