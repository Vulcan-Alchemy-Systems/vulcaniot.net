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
Template.DeviceNew.rendered = function(){
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
});

// events
Template.DeviceList.events({
  'click .device-new-submit': function(event) {
    event.preventDefault();

  }
});
