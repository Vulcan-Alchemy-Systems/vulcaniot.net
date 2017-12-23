// helpers
Template.NewRoom.helpers({
  location: function() {
    return Session.get('locationData');
  },
});

// events
Template.NewRoom.events({
  'click .new-room-submit': function(event) {
    var formData = AutoForm.getFormValues('insertLocationForm');
    var location = Session.get('locationData');

    // call update
    Meteor.call('updateLocation',
      location._id, formData.updateDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Rooms have been saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated location ' + location.name
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // set newRoom to false
          Session.set('NewRoom', false);

          // scrollTop
          $('body').scrollTop(0);
        }
      }
    );
  }
});
