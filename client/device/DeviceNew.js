// onCreated
Template.DeviceNew.onCreated(function() {
  Session.set('redirectAfterLogin', 'deviceList');
  this.autorun(() => {
    // subscriptions
    this.subscribe('allActiveVendors');
    this.subscribe('allActiveLocations');
  });
});

// rendered
Template.DeviceNew.rendered = function() {
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Device New'
  });

  $('body').scrollTop(0);
};

// helpers
Template.DeviceNew.helpers({
  // vendors
  vendors: function() {
    return Vendors.find().map(function(values) {
      return {
        label: values.name,
        value: values._id
      };
    });
  },

  // locations
  locations: function() {
    return Locations.find().map(function(values) {
      return {
        label: values.name,
        value: values._id
      };
    });
  },

  // types
  types: function() {
    return DeviceType.find().map(function(values) {
      return {
        label: values.name,
        value: values._id
      };
    });
  }
});

// events
Template.DeviceList.events({
  'click .device-new-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('insertDeviceForm').insertDoc;

    Meteor.call('createDevice', formData.name, formData.manufacture, formData.model, formData.serialNumber,
      formData.website, formData.vendor, formData.location, formData.installed, formData.lastMaintenance,
      formData.maintenanceScheduale, formData.status, formData.type, formData.ipAddress, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Device has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created device  #' + result
        });

        // reset session
        Session.set('DeviceNew', false);
      }

      // scroll to top
      $('body').scrollTop(0);
    });
  }
});
