
Template.UserList.onCreated( () => {
  Template.instance().subscribe( 'users' );
});

// rendered
Template.UserList.rendered = function(){

};

// helpers
Template.UserList.helpers({
  // gets all users
  userList: function() {
    var users = Meteor.users.find();

    if ( users ) {
      return users;
    }
  },
  // get user primary address
  userPrimaryEmail: function(emails) {
    return emails[0].address;
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },
  // test if user is active
  isUserActive: function(status) {
    if(status == 'Active') {
      return true;
    } else {
      return false;
    }
  }
});

// events
Template.UserList.events({
  // suspend user
  'click .user-suspend': function() {
    Meteor.call("usersToggleStatus", this._id, 'Suspended');
  },
  // un suspend user
  'click .user-un-suspend': function() {
    Meteor.call("usersToggleStatus", this._id, 'Active');
  },
  'click .user-create-btn': function() {
    // Trim Helper
    var trimInput = function(val) {
       return val.replace(/^\s*|\s*$/g, "");
    }

    // fields from form
    var name = trimInput($('[name=name]').val());
    var email = trimInput($('[name=email]').val());
    var password = trimInput($('[name=password]').val());
    var passwordAgain = trimInput($('[name=confirm]').val());
    var status = trimInput($('[name=status]').val());
    var role = trimInput($('[name=role]').val());

    // Check password is at least 6 chars long
    var isValidPassword = function(pwd, pwd2) {
       if (pwd === pwd2) {
         return pwd.length >= 6 ? true : false;
       } else {
         return swal({
            title: "Passwords don’t match",
            text: "Please try again",
            showConfirmButton: true,
            type: "error"
         });
       }
     }

     // if password is valid
     if (isValidPassword(password, passwordAgain)) {
       Accounts.createUser({
           email: email,
           name: name,
           status: status,
           role: role,
           password: password
      }, function(error) {
         if (error) {
            console.log("Error: " + error.reason);
         } else {
           // reset the form

         }
      });
    }
    // return nothinga
    return false;
  },
});

// router
FlowRouter.route('/admin/users', {
  name: 'users',
  parent: 'dashboard',
  title: 'Users',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserList'});
  },
});
