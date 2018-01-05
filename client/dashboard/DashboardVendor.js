// created
Template.DashboardVendor.onCreated(function() {
  this.autorun(() => {
    var vendorId = Meteor.user().profile.vendorId;
    this.subscribe('singleVendor', vendorId);
  });
});

// rendered
Template.DashboardVendor.rendered = function(){


};

// helpers
Template.DashboardVendor.helpers({
  vendor: function() {
    var vendorId = Meteor.user().profile.vendorId;
    result = Vendors.findOne({_id: vendorId});
    Session.set('VendorEntity', result);
    Session.set('VendorId', vendorId);
    return result;
  },

  // is active
  isVendorActive: function(status) {
    if(status == "Active") {
      return 'bg-aqua-active';
    } else {
      return 'bg-red';
    }
  },

  // status
  vendorStatus: function(status) {
    if(status) {
        return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    } else {
      return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    }
  },
});

// events
Template.DashboardVendor.events({

});
