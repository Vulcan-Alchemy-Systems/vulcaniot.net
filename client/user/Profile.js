
// helpers
Template.Profile.helpers({
  fullName: function() {
    return Meteor.user().profile.name;
  },
  profileImage: function() {
    return Meteor.user().profile.image;
  },
  profilePosition: function() {
    return Meteor.user().profile.position;
  },
  profileCreatedAt: function() {
    return Meteor.user().profile.createdAt;
  },
  profileEmail: function() {
    var emails = Meteor.user().emails;
    return emails[0].address;
  },
  profileBirthday: function() {
    return Meteor.user().profile.birthday;
  },
  profileGender: function() {
    return Meteor.user().profile.gender;
  }
});

// events
Template.Profile.events({
  'click .change-password': function(event) {
    event.preventDefault();

    var password = $('#password').val();

    console.log(Meteor.user());

    // call
    Meteor.call('userResetPassword', Meteor.userId(), password, function (error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Password was updated.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // redirect
        FlowRouter.go('signIn');
      }
    });
  },
});

// Routes
FlowRouter.route('/sign-up', {
  name: 'signUp',
  parent: 'dashboard',
  title: 'Sign Up',
  action: function() {
    BlazeLayout.render('SignInLayout', {main: 'SignUp'});
  },
});

FlowRouter.route('/sign-out', {
  name: 'signOut',
  parent: 'dashboard',
  title: 'Sign Out',
  action: function() {
    BlazeLayout.render('SignInLayout', {main: 'SignOut'});
  },
});

FlowRouter.route('/profile', {
  name: 'profile',
  parent: 'dashboard',
  title: 'My Profile',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'Profile'});
  },
});
