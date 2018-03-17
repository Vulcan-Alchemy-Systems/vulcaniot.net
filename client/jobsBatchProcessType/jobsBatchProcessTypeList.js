// onCreated
Template.JobsBatchProcessTypeList.onCreated(function() {
  Session.set('redirectAfterLogin', 'JobsBatchProcessList');
  this.autorun(() => {
    // clear session search
    Session.set("search-query", "");

    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscriptions
    this.subscribe('allJobsBatchProcessType', skipCount);
  });
});

// rendered
Template.JobsBatchProcessTypeList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Jobs Batch Process Type List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.JobsBatchProcessTypeList.helpers({
  JobsBatchProcessTypes: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  JobsBatchProcessType.find({}).fetch();
    return results;
  },
  // prevPage
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/admin/jobs/batch/process/types/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },

  // nextPage
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/admin/jobs/batch/process/types/:page";
    var params = {page: nextPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },

  // prevPageClass
  prevPageClass: function() {
    return currentPage() <= 1 ? "disabled" : "";
  },

  // nextPageClass
  nextPageClass: function() {
    return hasMorePages() ? "" : "disabled";
  }
});

// events
Template.JobsBatchProcessTypeList.events({
  // jobs-batch-process-type-new
  'click .jobs-batch-process-type-new': function(event) {
    event.preventDefault();
    Session.set('JobsBatchProcessTypeNew', ! Session.get('JobsBatchProcessTypeNew'));
  },
  // jobs-batch-process-type-edit
  'click .jobs-batch-process-type-edit': function(event) {
    event.preventDefault();
    Session.set('JobsBatchProcessTypeId', this._id);
    Session.set('JobsBatchProcessTypeEdit', ! Session.get('JobsBatchProcessTypeEdit'));
    Session.set('JobsBatchProcessTypeNew', false);
  },
  // jobs-batch-process-type-delete
  'click .jobs-batch-process-type-delete': function(event) {
    event.preventDefault();
    Session.set('JobsBatchProcessTypeId', this._id);
    Session.set('JobsBatchProcessTypeId', this._id);
    Session.set('JobsBatchProcessTypeDelete', ! Session.get('JobsBatchProcessTypeDelete'));
    Session.set('JobsBatchProcessTypeNew', false);
    Session.set('JobsBatchProcessTypeEdit', false);
  }
});

// routes
FlowRouter.route('/admin/jobs/batch/process/types', {
  name: 'JobsBatchProcessTypesList',
  parent: 'admin',
  title: 'Job Batch Process Types',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'JobsBatchProcessTypeList'});
  },
});

// hasMorePages
var hasMorePages = function() {
  var total = Counts.get('deviceCount');
  return currentPage() * parseInt(10) < total;
}

// currentPage
var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
