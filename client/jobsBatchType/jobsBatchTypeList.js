// onCreated
Template.JobsBatchTypeList.onCreated(function() {
  Session.set('redirectAfterLogin', 'JobsBatchTypesList');
  this.autorun(() => {
    // clear session search
    Session.set("search-query", "");

    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscriptions
    this.subscribe('allJobsBatchType', skipCount);
  });
});

// rendered
Template.JobsBatchTypeList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Jobs Batch Type List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.JobsBatchTypeList.helpers({
  jobsBatchTypes: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  JobsBatchType.find({}).fetch();
    return results;
  },
  // prevPage
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/admin/jobs/batch/types/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },

  // nextPage
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/admin/jobs/batch/types/:page";
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
Template.JobsBatchTypeList.events({
  // jobs-batch-type-new
  'click .jobs-batch-type-new': function(event) {
    event.preventDefault();
    Session.set('JobsBatchTypeNew', ! Session.get('JobsBatchTypeNew'));
    Session.set('JobsBatchTypeEdit', false);
    Session.set('JobsBatchTypeDelete', false);
  },
  // jobs-batch-type-edit
  'click .jobs-batch-type-edit': function(event) {
    event.preventDefault();
    Session.set('JobsBatchTypeId', this._id);
    Session.set('JobsBatchTypeEdit', ! Session.get('JobsBatchTypeEdit'));
    Session.set('JobsBatchTypeDelete', false);
    Session.set('JobsBatchTypeNew', false);
  },
  // jobs-batch-type-delete
  'click .jobs-batch-type-delete': function(event) {
    event.preventDefault();
    Session.set('JobsBatchTypeId', this._id);
    Session.set('JobsBatchTypeDelete', ! Session.get('JobsBatchTypeDelete'));
    Session.set('JobsBatchTypeEdit', false);
    Session.set('JobsBatchTypeNew', false);
  }
});

// routes
FlowRouter.route('/admin/jobs/batch/types', {
  name: 'JobsBatchTypesList',
  parent: 'admin',
  title: 'Job Batch Types',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'JobsBatchTypeList'});
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
