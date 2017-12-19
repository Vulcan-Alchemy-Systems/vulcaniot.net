// helpers
Template.LocationCameras.helpers({
  location: function() {
    return Session.get('locationData');
  },
});

// events
Template.LocationView.events({
  'click .new-camera': function(event) {
    Session.set('NewCamera', !Session.get('NewCamera'));
  },
});
