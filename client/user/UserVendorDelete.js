Template.UserVendorDelete.onCreated(function() {
  this.autorun(() => {
    var userId = Session.get('UserVendorId');
    this.subscribe('singleUser', userId);
  });
});

// helpers
Template.UserVendorDelete.helpers({
  // user
  user: function() {
    var userId = Session.get('UserVendorId');
    var userEntity = Meteor.users.findOne({_id: userId});
    return userEntity;
  },
});

// events
Template.UserVendorDelete.events({
  // delete
  'click .user-vendor-delete-cancel': function(event) {
    event.preventDefault();
    Session.set('UserVendorDelete', ! Session.get('UserVendorDelete'));
  },
  // delete submit
  'click .user-delete-submit': function(event) {
    event.preventDefault();
    var userId = Session.get('UserVendorId');

    // call update
    Meteor.call('deleteUser',
      userId,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
          console.log(error);
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>User has been updated.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // reset session
          Session.set('UserVendorDelete', false);
        }
      }
    );

  }
});
