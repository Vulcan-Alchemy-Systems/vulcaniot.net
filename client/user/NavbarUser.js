Template.NavbarUser.helpers({
  fullName: function() {
    return Meteor.user().profile.name;
  },
  profileImage: function() {
    return Meteor.user().profile.image;
  },
  profilePosition: function() {
    return Meteor.user().profile.position;
  },
  profileCreatedAt: function() {
    return Meteor.user().profile.createdAt;
  },
  registerEnabled: function() {
    return Meteor.settings.public.user.register.enabled;
  }
});
