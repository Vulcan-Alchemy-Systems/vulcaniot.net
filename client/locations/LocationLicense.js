// helpers
Template.LocationLicense.helpers({
  location: function() {
    return Session.get('locationData');
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  }
});


// events
Template.LocationLicense.events({
  'click .new-licenses': function(event) {
    Session.set('NewLicenses', !Session.get('NewLicenses'));
  },
});
