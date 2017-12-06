Template.Logo.helpers({
  siteName: function() {
    return Meteor.settings.public.siteName;
  },
  siteAbrv: function() {
    return Meteor.settings.public.siteAbrv;
  }
});
