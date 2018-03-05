// created
Template.DeviceView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleDevice', id);
    this.subscribe('allActiveDeviceTypes');
    this.subscribe('allActiveLocations');
    this.subscribe('allActiveVendors');
  });
});

// rendered
Template.DeviceView.rendered = function(){
  var id = FlowRouter.getParam('id');

  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Device #' + id
  });
};

// helpers
Template.DeviceView.helpers({
  // device
  device: function() {
    var id = FlowRouter.getParam('id');

    var result = Device.findOne({'_id': id});

    return result;
  },

  // getType
  getType: function(id) {
    var result = DeviceType.findOne({'_id': id});

    if(result) {
      return result.name;
    } else {
      return "Unknown";
    }
  },

  // getLocation
  getLocation: function(id) {
    var result = Locations.findOne({'_id': id});

    if(result) {
      return result.name;
    } else {
      return "Unknown";
    }
  },

  // getVendor
  getVendor: function(id) {
    var result = Vendors.findOne({'_id': id});

    if(result) {
      return result.name;
    } else {
      return "Unknown";
    }
  }
});

// events
Template.DeviceView.events({
    // device-edit
    'click .device-edit': function(event) {
      event.preventDefault();

      Session.set('DeviceEdit', ! Session.get('DeviceEdit'));
    },

    // device.delete
    'click .device.delete': function(event) {
      event.preventDefault();

      Session.set('DeviceDelete', ! Session.get('DeviceDelete'));
    }
});

// router
FlowRouter.route('/devices/:id/view', {
  name: 'deviceView',
  parent: 'deviceList',
  title: 'View',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'DeviceView'});
  },
});
