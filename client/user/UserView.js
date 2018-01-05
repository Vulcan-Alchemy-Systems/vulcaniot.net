Template.UserView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleUser', id);
    this.subscribe('roles');
  });
});

// rendered
Template.UserView.rendered = function(){
  var userData = Session.get('userData');
  if(userData) {
    Meteor.call('createHistory', {
      userId: Meteor.userId(),
      message: 'Viewed user ' + userData.profile.name
    });
  }
};

Template.registerHelper('isUserInRole', function(userId, role) {
  return Roles.userIsInRole(userId, role);
});

// helpers
Template.UserView.helpers({
  getUser: function() {
    var id = FlowRouter.getParam('id');
    var userData = Meteor.users.findOne({_id: id});
    if(userData) {
      Session.set('userData', userData);
      return userData;
    }
  },
  // get users email
  getUserEmail: function() {
    var userData = Session.get('userData');
    if(userData) {
      var emails = userData.emails;
      if(emails) {
        return emails[0].address;
      }
    }
  },
  // date format
  dateFormat: function(date) {
    return moment(date).format(Meteor.settings.public.longDate);
  },
  dateShortFormat: function(date) {
    return moment(date).format(Meteor.settings.public.shortDate);
  },
  // get all Roles for dropdown
  listRoles: function() {
    return Roles.getAllRoles();
  },
  // get all roles a user belongs to
  listUserRoles: function() {
    var roles = Roles.getRolesForUser(Session.get('userData'));
    return roles;
  },
});

// events
Template.UserView.events({
  // add user to role
  'click .add-role-to-users': function(event) {
    var user = Session.get('userData');
    var role = $.trim($('[name=role]').val());
    Meteor.call('addUserToRole', user, role, function (error) {
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
      var user = Session.get('userData');
      var role = event.currentTarget.id;
      if(role) {
        Meteor.call('removeUserRole', user, role, function (error) {
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

  // edit user
  'click .edit-user': function(event) {
    Session.set('EditUser', !Session.get('EditUser'));
  },

  // reset Password
  'click .reset-password': function(event) {
    $('#passwordModal').modal('toggle');
  },

  // do reset
  'click .do-reset-password': function(event) {
    var password = $("#password").val();
    var passwordConfirm = $("#confirm").val();
    var user = Session.get("userData");

    if (! isEmpty(password) && isValidPassword(password, passwordConfirm)) {
      Meteor.call('userResetPassword', user, password, function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Password was reset</div>');

          // set history
          $('#passwordModal').modal('toggle');
        }
      });
    } else {
      $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error resetting password</div>');
    }

    // auto dismis
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });
  }
});

// is not empty
var isEmpty = function(value) {
  return !value
}

// valid password function
var isValidPassword = function(password, passwordConfirm) {

   if (password === passwordConfirm) {
    console.log('passwordVar.length'+ password.length >= 6 ? true : false);
     return password.length >= 6 ? true : false;
   } else {
     return 'Passwords dont match';
   }
 }

FlowRouter.route('/admin/users/:id/view', {
  name: 'userView',
  parent: 'userList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserView'});
  },
});
