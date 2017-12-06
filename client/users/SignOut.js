import {FlowRouter} from 'meteor/kadira:flow-router';

Template.SignOut.onRendered(function() {
  Meteor.logout();
  FlowRouter.go("signIn");
});
