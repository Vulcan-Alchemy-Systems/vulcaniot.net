Template.Breadcrumb.helpers({
  breadcrumbEnabled: function() {
    if(Meteor.settings.public.features.breadcrumb) {
      return true;
    } else {
      return false;
    }
  }
});
