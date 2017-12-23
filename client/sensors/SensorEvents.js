// created
Template.SensorEvents.onCreated(function() {
  this.autorun(() => {
    var deviceId = FlowRouter.getParam('id');
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    this.subscribe('sensorEvents', deviceId, skipCount);
  });
});

// helpers
Template.SensorEvents.helpers({
  events: function() {
    var deviceId = FlowRouter.getParam('id');
    return Events.find({deviceId: deviceId}, {"sort" : [['createdAt', 'desc']]})
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
  prevPage: function() {
    var id = FlowRouter.getParam('id');
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/sensors/"+id+"/view/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },
  nextPage: function() {
    var id = FlowRouter.getParam('id');
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/sensors/"+id+"/view/:page";
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
Template.SensorEvents.events({
  'click #prevPage': function(event) {
      $('body').scrollTop(0);
  },
  'click #nextPage': function(event) {
    $('body').scrollTop(0);
  }
});

var hasMorePages = function() {
  var totalEvents = Counts.get('sensorEventsCount');
  return currentPage() * parseInt(Meteor.settings.public.recordsPerPage) < totalEvents;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
