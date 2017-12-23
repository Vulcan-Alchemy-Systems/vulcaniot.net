// created
Template.LocationSecurity.onCreated(function() {
  this.autorun(() => {
    var locationId = FlowRouter.getParam('id');
    this.subscribe('allLocationSensors', locationId);
  });
});

// helpers
Template.LocationSecurity.helpers({
  sensors: function() {
    var sensors = Sensors.find({}).fetch();
    return Sensors.find({});
  },
  sensor: function() {
    return Session.get('SensorData');
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },
  dateLongFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
  events: function() {
    var sensor = Session.get('SensorData');
    var events = Events.find({deviceId: sensor._id}, {"sort" : [['createdAt', 'desc']], "limit": 10}).fetch();
    return events;
  },
  sensorStatus: function(status) {
    if(status == "OK") {
      return "text-success";
    } else {
      return "text-danger";
    }
  }
});


// events
Template.LocationSecurity.events({
  'click .new-security': function(event) {
    Session.set('NewSecurity', !Session.get('NewSecurity'));
  },
  'click .view-sensor': function(event) {
    Session.set('SensorData', this);
    $('#sensorModal').modal('toggle');
  },
  'click .reset-event-data': function(event) {
    Meteor.call('eventsReset');
    $('#sensorModal').modal('toggle');
  },
  'click .view-sensor-details': function(event) {
    var sensorData = Session.get('SensorData');
    $('#sensorModal').modal('toggle');
    $('#sensorModal').on('hidden.bs.modal', function (e) {
      FlowRouter.go('sensorView', {id: sensorData._id});
    });
  },
});
