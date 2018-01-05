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
