import Chart from 'chart.js';
// created
Template.SensorView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleSensors', id);
  });
});

// rendered
Template.SensorView.rendered = function(){
  var id = FlowRouter.getParam('id');
  Meteor.setInterval(function () {
    Meteor.call(
      "getLastHour",
      id,
      function (error, result) {
        if(error) {
          console.log(error);
        } else {
          Session.set('EventData', result);
          events = Session.get('EventData');
          var id = FlowRouter.getParam('id');
          var sensor = Sensors.findOne({_id:id});

          // if line chart
          if(sensor.display == 'Line Chart') {
            if(events) {
              // get labels into an array
              var labels = events.map(function (doc) {
                return doc.createdAt;
              });

              // get values into an array
              var cpuData = events.map(function (doc) {
                return doc.event;
              });

              // format date
              for (var i in labels) {
                  var date = moment(labels[i]).format("HH:mm:ss");
                  labels[i] = date;
              }

              // get chart default settings
              var options = Meteor.settings.public.chartJs;
              var ctx = document.getElementById("myChart").getContext("2d");

              // set chart data
              var chartData = {
                labels  : labels,
                datasets: [
                  {
                    label: sensor.name,
                    data: cpuData
                  },
                ]
              }

              // create chart
              var myLineChart = new Chart(ctx, {
                  type: 'line',
                  data: chartData,
                  options: options
              });
            }
          }

          // if bar chart
          if(sensor.display == 'Bar Chart') {

          }

        }
      }
    );
  },5000);


}

// helpers
Template.SensorView.helpers({
  sensor: function() {
    var id = FlowRouter.getParam('id');
    return Sensors.findOne({_id:id});
  },
  status: function(status) {
    if(status == 'OK') {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  },
  sendAlert: function(alert) {
    if(alert) {
      return 'Yes';
    } else {
      return 'No';
    }
  },
  eventData: function() {
    return Session.get('EventData');
  }
});

// events
Template.SensorView.events({
  'click .edit-sensor': function(event) {
    Session.set('EditSensor', ! Session.get('EditSensor'));
  },
  'click .delete-sensor': function(event) {

  },
  'click .event-tab': function(event) {
    console.log("event-tab");
  },
  'click .sensor-tab': function(event) {
    console.log("sensor-tab");
  }
});

// router
FlowRouter.route('/sensors/:id/view', {
  name: 'sensorView',
  parent: 'sensorList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'SensorView'});
  },
});

FlowRouter.route('/sensors/:id/view/:page', {
  name: 'sensorViewPage',
  parent: 'sensorList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'SensorView'});
  },
});
