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
