// created
Template.DeviceEdit.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleDevice', id);
    this.subscribe('allActiveDeviceTypes');
    this.subscribe('allActiveLocations');
    this.subscribe('allActiveVendors');
  });
});

// rendered
Template.DeviceEdit.rendered = function(){
  var id = FlowRouter.getParam('id');

  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Edit Device #' + id
  });
};

// helpers
Template.DeviceEdit.helpers({
  // device
  device: function() {
    var id = FlowRouter.getParam('id');

    var result = Device.findOne({'_id': id});

    return result;
  },

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
Template.DeviceEdit.events({
  'click .device-edit-submit': function(event) {
    event.preventDefault();

    var id = FlowRouter.getParam('id');

    // set up form
    var formData = AutoForm.getFormValues('updateDeviceForm').updateDoc.$set;
    
    // scroll to top
    $('body').scrollTop(0);

    Meteor.call('updateDevice', id, formData.name, formData.manufacture, formData.model, formData.serialNumber,
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
        Session.set('DeviceEdit', false);
      }


    });
  }
});
