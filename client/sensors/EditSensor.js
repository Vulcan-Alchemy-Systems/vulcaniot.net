// created
Template.EditSensor.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleSensors', id);
  });
});

// helpers
Template.EditSensor.helpers({
  sensor: function() {
    var id = FlowRouter.getParam('id');
    var sensorData =  Sensors.findOne({_id:id});
    Session.set('SensorData', sensorData);
    return sensorData;
  },
});

// events
Template.EditSensor.events({
  // update sensor
  'click .edit-sensor-submit': function(event) {
    var formData = AutoForm.getFormValues('updateSensorForm');
    var sensorData = Session.get("SensorData");

    // call update
    Meteor.call('updateSensor',
      sensorData._id, formData.updateDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Sensor has been saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated sensor ' + sensorData._id
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // set edit to false
          Session.set('EditSensor', false);
        }
      }
    );
  },
  // remove sensor
  'click .delete-sensor': function(event) {

  }
});
