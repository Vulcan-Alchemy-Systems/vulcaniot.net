// onCreated
Template.SensorTypeList.onCreated(function() {
  Session.set('redirectAfterLogin', 'sensorTypeList');
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    // subscriptions
    this.subscribe('allSensorTypes', skipCount);
  });
});

// rendered
Template.SensorTypeList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Sensor Type List'
  });

  $('body').scrollTop(0);
};

// helpers
Template.SensorTypeList.helpers({
  //deviceTypes
  sensorTypes: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  SensorType.find( { $or: [{'name': query}]} );
    return results;
  },

  // prevPage
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/admin/sensor/types/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },

  // nextPage
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/admin/sensor/types/:page";
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
Template.SensorTypeList.events({
  // sensor-type-new
  'click .sensor-type-new': function(event) {
    event.preventDefault();
    Session.set('SensorTypeNew', ! Session.get('SensorTypeNew'));
    Session.set('SensorTypeEdit', false);
    Session.set('SensorTypeDelete', false);
  },
  // sensor-type-edit
  'click .sensor-type-edit': function(event) {
    event.preventDefault();
    Session.set('SensorTypeEdit', ! Session.get('SensorTypeEdit'));
    Session.set('SensorTypeNew', false);
    Session.set('SensorTypeDelete', false);
  },
  // sensor-type-delete
  'click .sensor-type-delete': function(event) {
    event.preventDefault();
    Session.set('SensorTypeDelete', ! Session.get('SensorTypeDelete'));
    Session.set('SensorTypeNew', false)
    Session.set('SensorTypeEdit', false);
  },
});

// router
FlowRouter.route('/admin/sensor/types/:page', {
  name: 'sensorTypeListPage',
  parent: 'admin',
  title: 'Sensor Types',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'SensorTypeList'});
  },
});

FlowRouter.route('/admin/sensor/types', {
  name: 'sensorTypeList',
  parent: 'admin',
  title: 'Sensor Types',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'SensorTypeList'});
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
