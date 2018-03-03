// onCreated
Template.DeviceTypeNew.onCreated(function() {
  Session.set('redirectAfterLogin', 'deviceList');
  this.autorun(() => {
  });
});

// rendered
Template.DeviceTypeNew.rendered = function() {
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Device Type New'
  });

  $('body').scrollTop(0);
};

// events
Template.DeviceTypeNew.events({
  // device-type-new-submit
  'click .device-type-new-submit': function(event) {
    event.preventDefault();

    // set up form
    var formData = AutoForm.getFormValues('insertDeviceTypeForm').insertDoc;

    Meteor.call('deviceTypeCreate', formData.name, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Device Type has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created device type #'
        });

        // reset session
        Session.set('DeviceTypeNew', false);
      }
    });
    $('body').scrollTop(0);
  }
});
