// on created
Template.LocationList.onCreated(function() {
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allLocations', skipCount);
    Session.set("search-query", "");
  });
});

// rendered
Template.LocationList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Location List'
  });
};

// helpers
Template.LocationList.helpers({
  locations: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Locations.find( { $or: [{'name': query}]} );
    return results;
  },
  searchQuery: function() {
    return Session.get("search-query");
  },
  isLocationActive: function(status) {
    if(status == 'Active') {
      return 'bg-aqua-active';
    } else {
      return 'bg-red';
    }
  },
  locationStatus: function(status) {
    if(status) {
        return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    } else {
      return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    }
  },
  roomCount: function(rooms) {
    if(rooms) {
      return rooms.length;
    } else {
      return 0;
    }
  },
  licenseCount: function(license) {
    if(length) {
      return license.length;
    } else {
      return 0;
    }
  },
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/locations/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/locations/:page";
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
Template.LocationList.events({
  'click .new-location': function() {
    Session.set('NewLocation', !Session.get('NewLocation'));
  },
  'click #prevPage': function(event) {
      $('body').scrollTop(0);
  },
  'click #nextPage': function(event) {
    $('body').scrollTop(0);
  },
  'keyup .location-search': function(event) {
    Session.set("search-query", event.currentTarget.value);
    console.log(event.currentTarget.value);
  }
});

// router
FlowRouter.route('/locations', {
  name: 'locationsList',
  parent: 'dashboard',
  title: 'Location',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'LocationList'});
  },
});

FlowRouter.route('/locations/:page', {
  name: 'locationsPage',
  parent: 'dashboard',
  title: 'Location',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'LocationList'});
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
