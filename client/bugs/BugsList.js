// onCreated
Template.BugsList.onCreated(function() {
  Session.set('redirectAfterLogin', 'bugsList');
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allBugs', skipCount);
    Session.set("search-query", "");
  });
});

// helpers
Template.BugsList.helpers({
  bugs: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Bugs.find( { $or: [{'title': query}]} );
    return results;
  }
});

// events
Template.BugsList.events({
  // bugs-new
  'click .bugs-new': function(event) {
    event.preventDefault();
    Session.set('BugsNew', ! Session.get('BugsNew'));
    Session.set('BugsEdit', false);
    Session.set('BugsDelete', false);
  },
  // bugs-edit
  'click .bugs-edit': function(event) {
    event.preventDefault();
    Session.set('BugsEdit', ! Session.get('BugsEdit'));
    Session.set('Bug', this);
    Session.set('BugsDelete', false);
    Session.set('BugsNew', false);
  },
  // bugs-delete
  'click .bugs-delete': function(event) {
    event.preventDefault();
    Session.set('BugsDelete', ! Session.get('BugsDelete'));
    Session.set('Bug', this);
    Session.set('BugsEdit', false);
    Session.set('BugsNew', false);
  },
  
});

// router
FlowRouter.route('/bugs/:page', {
  name: 'bugsListPage',
  parent: 'dashboard',
  title: 'Bugs',
  triggersEnter: [function(context, redirect) {
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'BugsList'});
  },
});

FlowRouter.route('/bugs', {
  name: 'bugsList',
  parent: 'dashboard',
  title: 'Bugs',
  triggersEnter: [function(context, redirect) {
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'BugsList'});
  },
});
