Template.JobsList.onCreated(function() {
  this.autorun(() => {
    var customerId = FlowRouter.getParam('customerId');
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
    var customerId = FlowRouter.getParam('customerId');
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

  // New Job
  'click .job-new': function(event) {
    event.preventDefault();
    Session.set('JobNew', !Session.get('JobNew'));
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
