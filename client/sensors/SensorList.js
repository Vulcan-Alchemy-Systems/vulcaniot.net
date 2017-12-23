// on created
Template.SensorList.onCreated(function() {
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;

    this.subscribe('allSensors', skipCount);
  });
});

// rendered
Template.SensorList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Sensor List'
  });
};

// helpers
Template.SensorList.helpers({
  sensors: function() {
      return Sensors.find({}).fetch();
  },
  sensorStatus: function(status) {
    console.log(status)
    if(status == "OK") {
      return 'bg-green';
    } else {
      return 'bg-red';
    }
  },
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/sensors/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/sensors/:page";
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
Template.SensorList.events({

});

FlowRouter.route('/sensors', {
  name: 'sensorList',
  parent: 'dashboard',
  title: 'Sensors',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'SensorList'});
  },
});

FlowRouter.route('/sensors/:page', {
  name: 'sensorListPage',
  parent: 'dashboard',
  title: 'Sensors',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'SensorList'});
  },
});

var hasMorePages = function() {
  var totalSensors = Counts.get('sensorsCount');
  return currentPage() * parseInt(10) < totalLocations;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
