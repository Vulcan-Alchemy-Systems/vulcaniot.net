// flash messengers
FlashMessages.configure({
    autoHide: true,
    hideDelay: 5000,
    autoScroll: true
});


// Blaze config
Blaze._allowJavascriptUrls();

// dateFormatLong
Template.registerHelper( 'dateFormatLong', ( dateTime ) => {
  return moment(dateTime).format(Meteor.settings.public.longDate);
});

// dateFormatShort
Template.registerHelper( 'dateFormatShort', ( dateTime ) => {
  return moment(dateTime).format(Meteor.settings.public.shortDate);
});

// searchQuery
Template.registerHelper( 'searchQuery', () => {
  return Session.get("search-query");
});

// sitename
Template.registerHelper( 'siteName', () => {
  return Meteor.settings.public.siteName;
});

// site url
Template.registerHelper( 'siteUrl', () => {
  return Meteor.settings.public.siteUrl;
});

// version
Template.registerHelper( 'siteVersion', () => {
  return Meteor.settings.public.siteVersion;
});

// street
Template.registerHelper( 'addressStreet', () => {
  return Meteor.settings.public.address.street;
});

Template.registerHelper( 'addressStreetCont', () => {
  return Meteor.settings.public.address.streetCont;
});

Template.registerHelper( 'addressCity', () => {
  return Meteor.settings.public.address.city;
});

Template.registerHelper( 'addressState', () => {
  return Meteor.settings.public.address.city;
});

Template.registerHelper( 'addressPostal', () => {
  return Meteor.settings.public.address.city;
});

Template.registerHelper( 'formateMoney', (value) => {
  var value = parseFloat(value);
  return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
});
