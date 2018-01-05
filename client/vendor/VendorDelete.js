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
    Session.set('VendorEntity', result);
    return result;
  },
});

// events
Template.VendorDelete.events({
  'click .vendor-delete-submit': function(event) {
    event.preventDefault();

    var VendorEntity = Session.get('VendorEntity');

    // call insert
    Meteor.call('deleteVendor',
      VendorEntity._id,
      function (error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Vendor has been deleted.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'deleted vendor ' + VendorEntity.name
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          $('body').scrollTop(0);

          // clear session vars
          Session.set('VendorEntity', null);
          Session.set('VendorView', false);
          Session.set('VendorDelete', false);
          Session.set('VendorEdit', false);

          FlowRouter.go('vendorList');
        }
      }
    );

  }
});
