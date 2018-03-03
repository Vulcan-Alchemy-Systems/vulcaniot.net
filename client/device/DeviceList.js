// onCreated
Template.DeviceList.onCreated(function() {
  Session.set('redirectAfterLogin', 'deviceList');
  this.autorun(() => {
    // clear session search
    Session.set("search-query", "");

    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscriptions
    this.subscribe('allDevices', skipCount);
    this.subscribe('allActiveVendors');
    this.subscribe('allActiveLocations');
  });
});

// rendered
Template.DeviceList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Device List'
  });

  $('body').scrollTop(0);
};


// helpers
Template.DeviceList.helpers({
  // devices
  devices: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Device.find( { $or: [{'name': query}]} );

    return results;
  },

  // vendors
  vendors: function() {
    var results = Vendors.find({status: "Active"}).fetch();

    return results;
  },

  // locations
  locations: function() {
      var results = Locations.find({status: "Active"}).fetch();

      return results;
  },

  // prevPage
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/devices/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },

  // nextPage
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/devices/:page";
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
Template.DeviceList.events({
  'click .device-new': function(event) {
    event.preventDefault();

    Session.set('DeviceNew', ! Session.get('DeviceNew'));
  },
});

// router
FlowRouter.route('/devices/:page', {
  name: 'deviceListPage',
  parent: 'dashboard',
  title: 'Devices',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'DeviceList'});
  },
});

FlowRouter.route('/devices', {
  name: 'deviceList',
  parent: 'dashboard',
  title: 'Devices',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'DeviceList'});
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
