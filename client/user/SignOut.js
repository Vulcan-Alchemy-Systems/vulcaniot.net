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

  // clear all session vars
  Session.keys = {};

  // redirect back to sign-in
  FlowRouter.go("signIn");
});
