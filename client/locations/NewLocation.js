// events
Template.NewLocation.events({
  'click .new-location-submit': function(event) {
    var formData = AutoForm.getFormValues('insertLocationForm');

    // call update
    Meteor.call('createLocation',
      formData.insertDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Location was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created location'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('NewLocation', false);

          // scrollTop
          $('body').scrollTop(0);
        }
      }
    );
  }
});
