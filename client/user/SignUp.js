import {FlowRouter} from 'meteor/kadira:flow-router';

// events
Template.SignUp.events({
  // form submited
  'submit form': function(event){
      event.preventDefault();

      var name = $('[name=name]').val();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();

      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          name: name,
          image: "/images/user2-160x160.jpg",
          position: "None",
          createdAt: new Date(),
          status: 'Active',
        }
      }, function(error){
        if(error){
          $('#alert').html('<div class="alert alert-danger"><p>' + error.reason + '</p></div>');
          console.log(error.reason); // Output error if registration fails
        } else {

          FlowRouter.go("dashboard"); // Redirect user if registration succeeds
        }
      });
    }
});

// helpers
Template.SignUp.helpers({
  siteName: function() {
    return Meteor.settings.public.siteName;
  },
  siteAbrv: function() {
    return Meteor.settings.public.siteAbrv;
  },
  rememberMeEnabled: function() {
    return Meteor.settings.public.user.signIn.rememberMe;
  },
  signInFacebookEnabled: function() {
    return Meteor.settings.public.user.signIn.facebook;
  },
  signInGoogleEnabled: function() {
    return Meteor.settings.public.user.signIn.google;
  },
  registerEnabled: function() {
    return Meteor.settings.public.user.register.enabled;
  }
});
