import {FlowRouter} from 'meteor/kadira:flow-router';

// on onRendered
Template.SignOut.onRendered(function() {
  // record history
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'User signed out.'
  });

  // do logout
  Meteor.logout();

  // redirect back to sign-in
  FlowRouter.go("signIn");
});
