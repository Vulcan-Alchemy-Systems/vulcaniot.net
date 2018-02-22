Template.Profile.onCreated(function() {
  this.autorun(() => {
    Session.set('UserId', Meteor.userId());
  });
});

Template.registerHelper('profileImage', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.image;
  }
});

Template.registerHelper('profilePosition', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.position;
  }
});

Template.registerHelper('profileCreatedAt', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.createdAt;
  }
});

Template.registerHelper('profileEmail', function() {
  if (Meteor.user()) {
    var emails = Meteor.user().emails;
    return emails[0].address;
  }
});

Template.registerHelper('profileBirthday', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.birthday;
  }
});

Template.registerHelper('profileGender', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.gender;
  }
});

Template.registerHelper('profileFullName', function() {
  if (Meteor.user()) {
    return Meteor.user().profile.name;
  }
});

// helpers
Template.Profile.helpers({});

// events
Template.Profile.events({
  'click .change-password': function(event) {
    event.preventDefault();

    var password = $('#password').val();

    // call
    Meteor.call('userResetPassword', Meteor.userId(), password, function(error) {
      if (error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Password was updated.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // redirect
        FlowRouter.go('signIn');
      }
    });
  },

});

// routes
FlowRouter.route('/profile', {
  name: 'profile',
  parent: 'dashboard',
  title: 'My Profile',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      redirect('/sign-in');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {
      main: 'Profile'
    });
  },
});


FlowRouter.route('/sign-out', {
  name: 'signOut',
  parent: 'dashboard',
  title: 'Sign Out',
  action: function() {
    BlazeLayout.render('SignInLayout', {
      main: 'SignOut'
    });
  },
});

// Routes
FlowRouter.route('/sign-up', {
  name: 'signUp',
  parent: 'dashboard',
  title: 'Sign Up',
  action: function() {
    BlazeLayout.render('SignInLayout', {
      main: 'SignUp'
    });
  },
});
