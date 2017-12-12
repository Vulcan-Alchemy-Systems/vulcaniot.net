
Template.UserList.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allUsers');
  });
});

// rendered
Template.UserList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Admin User List'
  });
};

// helpers
Template.UserList.helpers({
  // gets all users
  userList: function() {
    var users = Meteor.users.find().fetch();
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
  // create user
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
    //var role = trimInput($('[name=role]').val());

    // Check password is at least 6 chars long
    var isValidPassword = function(pwd, pwd2) {
       if (pwd === pwd2) {
         return pwd.length >= 6 ? true : false;
       } else {
         $('#alert').html('<div class="alert alert-danger"><p>Password fails</p></div>');
       }
     }

     // if password is valid
     if (isValidPassword(password, passwordAgain)) {
       Accounts.createUser({
          email: email,
          name: name,
          status: status,
          password: password
      }, function(error) {
         if (error) {
           $('#alert').html('<div class="alert alert-danger"><p>' + error.reason + '</p></div>');
           console.log(error.reason); // Output error if registration fails
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
var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'adminUsers'

});

adminRoutes.route('/users', {
  name: 'userList',
  parent: 'admin',
  title: 'Users',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserList'});
  },
});
adminRoutes.route('/users/:id/view', {
  name: 'userView',
  parent: 'userList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserView'});
  },
});
adminRoutes.route('/users/:id/edit', {
  name: 'userEdit',
  parent: 'userView',
  title: 'Edit',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserEdit'});
  },
});
adminRoutes.route('/users/:id/delete', {
  name: 'userDelete',
  parent: 'userView',
  title: 'Delete',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserDelete'});
  },
});
