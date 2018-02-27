// onCreated
Template.BugListWidget.onCreated(function() {
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
Template.BugListWidget.helpers({
  bugs: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Bugs.find( { $or: [{'title': query}]} );
    return results;
  }
});
