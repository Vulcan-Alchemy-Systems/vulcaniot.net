// helpers
Template.NewSecurity.helpers({
  location: function() {
    return Session.get('locationData');
  },
});

// events
Template.NewSecurity.events({
  'click .new-security-submit': function(event) {
    var formData = AutoForm.getFormValues('insertSecurityForm');
    var location = Session.get('locationData');
    formData.insertDoc.locationId = location._id;

    // call update
    Meteor.call('createSensor',
      formData.insertDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Sensor was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created sensor for location ' + location.name
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('NewSecurity', false);

          // scrollTop
          $('body').scrollTop(0);
        }
      }
    );
  }
});
