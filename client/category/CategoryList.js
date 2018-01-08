// on Created
Template.CategoryList.onCreated(function() {
  Session.set('redirectAfterLogin', 'categoryList');
  Session.set("search-query", "");

  // auto run
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscribe
    this.subscribe('allCategory', skipCount);
  });
});

// rendered
Template.CategoryList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Category List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.CategoryList.helpers({
  // category
  categories: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Category.find( { $or: [{'name': query}]} );
    return results;
  },

  // pagination
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/admin/category/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/admin/category/:page";
    var params = {page: nextPage};
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

// events
Template.CategoryList.events({
  // new
  'click .category-new': function(event) {
    Session.set('CategoryNew', ! Session.get('CategoryNew'));
  },

  // edit
  'click .category-edit': function(event) {
    Session.set('CategoryEdit', ! Session.get('CategoryEdit'));
  },

  // delete
  'click .category-delete': function(event) {
    Session.set('CategoryDelete', ! Session.get('CategoryDelete'));
  },

  // view
  'click .category-view': function(event) {
    Session.set('CategoryId', this._id);
    Session.set('CategoryView', ! Session.get('CategoryView'));
  }
});

// routes
FlowRouter.route('/admin/category/:page', {
  name: 'CategoryListPage',
  parent: 'admin',
  title: 'Categories',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CategoryList'});
  },
});

FlowRouter.route('/admin/category', {
  name: 'CategoryList',
  parent: 'admin',
  title: 'Categories',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CategoryList'});
  },
});

// pagination functions
var hasMorePages = function() {
  var totalLocations = Counts.get('locationsCount');
  return currentPage() * parseInt(10) < totalLocations;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
