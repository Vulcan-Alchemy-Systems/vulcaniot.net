Template.JobProductNew.onCreated(function() {
  this.autorun(() => {
      this.subscribe('weightEvent', '/vulcan/scale/weight', 1);
      this.subscribe('gasEvent', '/vulcan/scale/gas', 1);
  });
});

// helpers
Template.JobProductNew.helpers({
  job: function() {
    return Session.get('Job');
  },
  scaleWeight: function() {
    var entity = Events.findOne({topic: '/vulcan/scale/weight'}, {sort:{created: -1 }}); //.sort({ 'sequence': 1 });
    return entity.weight;
  },
  scaleGas: function() {
    var entity = Events.findOne({topic: '/vulcan/scale/gas'}, {sort:{created: -1 }});
    console.log(entity);
    return entity.gas;
  }
});

// rendered
Template.JobProductNew.rendered = function(){

};


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

        MeteorCamera.getPicture(cameraOptions, function (error, data) {
           if (!error) {
               instance.$('.photo').attr('src', data);
           }
        });
    }
});
