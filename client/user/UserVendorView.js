Template.UserVendorView.onCreated(function() {
  this.autorun(() => {
    var userId = Session.get('UserVendorId');
    this.subscribe('singleUser', userId);
    this.subscribe('roles');
  });
});

// helpers
Template.UserVendorView.helpers({
  // user
  user: function() {
    var userId = Session.get('UserVendorId');
    var userEntity = Meteor.users.findOne({_id: userId});
    return userEntity;
  },
  // get all Roles for dropdown
  listRoles: function() {
    return Roles.getAllRoles();
  },
  // roles
  listUserRoles: function() {
    var userId = Session.get('UserVendorId');
    var roles = Roles.getRolesForUser(userId);
    return roles;
  },
  userEmail: function(emails) {
    if(emails) {
      return emails[0].address;
    }
  }
});

// events
Template.UserVendorView.events({
  // edit
  'click .user-vendor-edit': function(event) {
    event.preventDefault();
    Session.set('UserVendorEdit', ! Session.get('UserVendorEdit'));
  },

  // Delete
  'click .user-vendor-delete': function(event) {
    event.preventDefault();
    Session.set('UserVendorDelete', ! Session.get('UserVendorDelete'));
  },

  // password
  'click .user-vendor-password': function(event) {
    event.preventDefault();
    Session.set('UserVendorPassword', ! Session.get('UserVendorPassword'));
  },

  // add user to role
  'click .add-role-to-users': function(event) {
    event.preventDefault();
    var userId = Session.get('UserVendorId');
    var userEntity = Meteor.users.findOne({_id: userId});
    var role = $.trim($('[name=role]').val());

    // call
    Meteor.call('addUserToRole', userEntity, role, function (error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>User Role was added.</div>');
      }
    });

    // auto dismis
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });
  },

  // remove role
  'click .remove-role': function(event, instance) {
    event.preventDefault();
    var userId = Session.get('UserVendorId');
    var userEntity = Meteor.users.findOne({_id: userId});
    var role = event.currentTarget.id;

    if(role) {
        Meteor.call('removeUserRole', userEntity, role, function (error) {
          if(error) {
            $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
          } else {
            $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>User Role '+role+' was removed.</div>');
          }
        });
      } else {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error missing role</div>');
      }
      // auto dismis
      $("#alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#alert").slideUp(500);
      });
  },
});
