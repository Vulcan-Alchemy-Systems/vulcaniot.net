
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
  }
});


// Routes
FlowRouter.route('/sign-in', {
  name: 'signIn',
  parent: 'dashboard',
  title: 'Sign In',
  action: function() {
    BlazeLayout.render('SignInLayout', {main: 'SignIn'});
  },
});

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
