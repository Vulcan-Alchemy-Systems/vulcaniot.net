// helpers
Template.LocationAccess.helpers({
  location: function() {
    return Session.get('locationData');
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },
  users: function() {
    return Session.get('UserAccessdata');
  }
});


// events
Template.LocationAccess.events({
  'click .new-access': function(event) {
    Session.set('NewAccess', !Session.get('NewAccess'));
  },
  'click .view-access': function(event) {
    Session.set('UserAccessdata', this.users);
    $('#userAccessModal').modal('toggle');

    console.log(this.users);
  }
});
