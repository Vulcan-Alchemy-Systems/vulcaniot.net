// helpers
Template.NewUser.helpers({
});

// events
Template.NewUser.events({
  // create user
  'click .new-user-submit': function(event) {
    var formData = AutoForm.getFormValues('insertUserForm');

    // call update
    Meteor.call('usersCreate',
      formData.insertDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>User has been created.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // reset session
          Session.set('NewUser', !Session.get('NewUser'))
        }
      }
    );
  },
});
