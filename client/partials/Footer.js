Template.Footer.helpers({
  siteName: function() {
    return Meteor.settings.public.siteName;
  },
  siteUrl: function() {
    return Meteor.settings.public.siteUrl;
  },
  copyright: function() {
    return Meteor.settings.public.copyright;
  },
  copyEndDate: function() {
    var d = new Date();
    return d.getFullYear();
  },
  siteVersion: function() {
    return Meteor.settings.public.siteVersion;
  }
});
