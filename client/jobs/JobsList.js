Template.JobsList.onCreated(function() {
  this.autorun(() => {
    var customerId = FlowRouter.getParam('id');
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
    var customerId = FlowRouter.getParam('id');
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Jobs.find({customerId: customerId}).fetch();
    return results;
  },
  longDateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
});

// events
Template.JobsList.events({
  'click .new-job': function(event) {
    Session.set('NewJob', !Session.get('NewJob'));
  },
});
