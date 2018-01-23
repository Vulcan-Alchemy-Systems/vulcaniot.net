Template.JobProductNew.helpers({
  job: function() {
    return Session.get('Job');
  }
});

// events
Template.JobProductNew.events({
  'click .job-product-new-submit': function(event, instance) {
    event.preventDefault();

    var job = Session.get('Job');

    var image = instance.$('.photo').attr('src');
    var quantity = instance.$('#weight').val();
    var unitOfMeasureName = 'Grams';
    var type = instance.$('#type').val();

    // call update
    Meteor.call('jobProductCreate', job._id, image, quantity, unitOfMeasureName, type, function(error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Product has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Added product to  job ' + job._id
        });

        // reset session
        Session.set('JobProductNew', !Session.get('JobProductNew'));
      }
    });
  },

  // capture photo
  'click .takePhoto': function(e, instance) {
        e.preventDefault();

        // set size this could be moved to the settings file
        var cameraOptions = {
            width: 800,
            height: 600
        };

        // fetch weight from the cloud
        $('#weight').val(12.65);

        MeteorCamera.getPicture(cameraOptions, function (error, data) {
           if (!error) {
               instance.$('.photo').attr('src', data);
           }
        });
    }
});
