// onCreated
Template.DeviceTypeList.onCreated(function() {
  Session.set('redirectAfterLogin', 'deviceTypeList');
  this.autorun(() => {
    // clear session search
    Session.set("search-query", "");

    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscriptions
    this.subscribe('allDeviceTypes', skipCount);
  });
});

// rendered
Template.DeviceTypeList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Device Type List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.DeviceTypeList.helpers({
  //deviceTypes
  deviceTypes: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  DeviceType.find( { $or: [{'name': query}]} );

    return results;
  },

  // prevPage
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/admin/device/types/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },

  // nextPage
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/admin/device/types/:page";
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
Template.DeviceTypeList.events({
  // device-type-new
  'click .device-type-new': function(event) {
    event.preventDefault();
    Session.set('DeviceTypeNew', ! Session.get('DeviceTypeNew'));
    Session.set('DeviceTypeEdit', false);
    Session.set('DeviceTypeDelete', false);
  },

  // device-type-edit
  'click .device-type-edit': function(event) {
    event.preventDefault();
    Session.set('DeviceTypeEdit', ! Session.get('DeviceTypeEdit'));
    Session.set('DeviceTypeNew', false);
    Session.set('DeviceTypeDelete', false);
  },

  // device-type-delete
  'click .device-type-delete': function(event) {
    event.preventDefault();
    Session.set('DeviceTypeDelete', ! Session.get('DeviceTypeDelete'));
    Session.set('DeviceTypeEdit', false);
    Session.set('DeviceTypeEdit', false);
    Session.set('DeviceTypeNew', false);
  }
});

// router
FlowRouter.route('/admin/device/types/:page', {
  name: 'deviceTypeListPage',
  parent: 'admin',
  title: 'Device Types',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'DeviceTypeList'});
  },
});

FlowRouter.route('/admin/device/types', {
  name: 'deviceTypeList',
  parent: 'admin',
  title: 'Device Type',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'DeviceTypeList'});
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
