import {FlowRouter} from 'meteor/kadira:flow-router';

// events
Template.SignUp.events({
  // form submited
  'submit form': function(event){
      event.preventDefault();

      // Trim Helper
       var trimInput = function(val) {
           return val.replace(/^\s*|\s*$/g, "");
       }

      var name = trimInput($('[name=name]').val());
      var email = trimInput($('[name=email]').val());
      var password = trimInput($('[name=password]').val());

      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          name: name,
          image: "/images/user2-160x160.jpg",
          position: "None",
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
