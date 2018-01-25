Template.Footer.helpers({
  copyright: function() {
    return Meteor.settings.public.copyright;
  },
  copyEndDate: function() {
    var d = new Date();
    return d.getFullYear();
  },
});
