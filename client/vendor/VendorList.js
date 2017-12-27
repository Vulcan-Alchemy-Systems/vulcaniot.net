Template.VendorList.onCreated(function() {
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allVendors', skipCount);
    Session.set("search-query", "");
  });
});

// rendered
Template.VendorList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Vendors List'
  });
};

// helpers
Template.VendorList.helpers({
  vendors: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Vendors.find( { $or: [{'name': query}]} );
    return results;
  },
  // search query
  searchQuery: function() {
    return Session.get("search-query");
  },
  isVendorActive: function(status) {
    if(status == "Active") {
      return 'bg-aqua-active';
    } else {
      return 'bg-red';
    }
  },
  vendorStatus: function(status) {
    if(status) {
        return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    } else {
      return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    }
  },
  // pagination stuff
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/vendors/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/vendors/:page";
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
Template.VendorList.events({
  'click .new-vendor': function(event) {
    Session.set('NewVendor', !Session.get('NewVendor'));
  },
  'click #prevPage': function(event) {
      $('body').scrollTop(0);
  },
  'click #nextPage': function(event) {
    $('body').scrollTop(0);
  },
  'keyup .vendor-search': function(event) {
    Session.set("search-query", event.currentTarget.value);
  }
});

// router
FlowRouter.route('/vendors', {
  name: 'vendorList',
  parent: 'dashboard',
  title: 'Vendors',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'VendorList'});
  },
});

FlowRouter.route('/vendors/:page', {
  name: 'vendorListPage',
  parent: 'dashboard',
  title: 'Vendors',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'VendorList'});
  },
});

var hasMorePages = function() {
  var totalLocations = Counts.get('locationsCount');
  return currentPage() * parseInt(10) < totalLocations;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
