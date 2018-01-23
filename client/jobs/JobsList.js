Template.JobsList.onCreated(function() {
  this.autorun(() => {
    var customerId = Session.get('CustomerId');
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allCustomerJobs', customerId, skipCount);
    Session.set("search-query", "");
  });
});

// helpers
Template.JobsList.helpers({
  jobs: function() {
    var customerId = Session.get('CustomerId');
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Jobs.find({customerId: customerId}).fetch();
    return results;
  },

  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    Session.set('page', previousPage);
  },

  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    Session.set('page', nextPage);
  },

  prevPageClass: function() {
    return currentPage() <= 1 ? "disabled" : "";
  },

  nextPageClass: function() {
    return hasMorePages() ? "" : "disabled";
  }
});

// events
Template.JobsList.events({
  // View Job
  'click .job-view': function(event) {
    event.preventDefault();
    Session.set('JobId', this._id);
    Session.set('JobView', !Session.get('JobView'));
  },

  // New Job
  'click .job-new': function(event) {
    event.preventDefault();
    Session.set('JobNew', !Session.get('JobNew'));
  },

  // editJob
  'click .job-edit': function(event) {
    event.preventDefault();
    Session.set('JobEdit', !Session.get('JobEdit'));
  },

  // delete job
  'click .job-delete': function(event) {
    event.preventDefault();
    Session.set('JobDelete', !Session.get('JobDelete'));
  },

});

var hasMorePages = function() {
  var totalCustomers = Counts.get('customerCount');
  return currentPage() * parseInt(10) < totalCustomers;
}

var currentPage = function() {
  var page = Session.get('page');
  return parseInt(page) || 1;
}
