// helpers
Template.LocationRooms.helpers({
  location: function() {
    return Session.get('locationData');
  },
  room: function() {
    return Session.get('RoomData');
  }
});

// events
Template.LocationRooms.events({
  'click .new-room': function(event) {
    Session.set('NewRoom', !Session.get('NewRoom'));
  },
  'click .view-room': function(event) {
    Session.set('RoomData', this);
    Session.set('ViewRoom', !Session.get('ViewRoom'));
  }
});
