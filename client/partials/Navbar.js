Template.Navbar.events({
});

Template.Navbar.helpers({
  messagesEnabled: function() {
    if(Meteor.settings.public.features.messages) {
      return true;
    } else {
      return false;
    }
  },
  notificationsEnabled: function() {
    if(Meteor.settings.public.features.notifications) {
      return true;
    } else {
      return false;
    }
  },
  tasksEnabled: function() {
    if(Meteor.settings.public.features.tasks) {
      return true;
    } else {
      return false;
    }
  },
  userEnabled: function() {
    if(Meteor.settings.public.features.user) {
      return true;
    } else {
      return false;
    }
  },
  controlSliderEnabled: function() {
    if(Meteor.settings.public.features.controlSlider) {
      return true;
    } else {
      return false;
    }
  }
});
