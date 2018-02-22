Template.UserProfileHistory.onCreated(function() {
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage; // 3 records per page

    this.subscribe('userHistory', Meteor.userId(), skipCount);
  });
});

// rendered
Template.UserProfileHistory.rendered = function() {

};

// helpers
Template.UserProfileHistory.helpers({
  getUserHistoryData: function() {
    //return Session.get('userHistoryData')
    return History.find();
  },
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/customers/:page";
    var params = {
      page: previousPage
    };
    var path = FlowRouter.path(pathDef, params);
    return path;
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/customers/:page";
    var params = {
      page: nextPage
    };
    var path = FlowRouter.path(pathDef, params);
    return path;
  },
  prevPageClass: function() {
    return currentPage() <= 1 ? "disabled" : "";
  },
  nextPageClass: function() {
    return hasMorePages() ? "" : "disabled";
  }
});

var hasMorePages = function() {
  var totalCustomers = Counts.get('customerCount');
  return currentPage() * parseInt(10) < totalCustomers;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
