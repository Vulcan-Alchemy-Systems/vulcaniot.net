import { Roles } from 'meteor/alanning:roles';

// methods
Meteor.methods({
  // create role
  createRole: function(role) {
    Roles.createRole(role.name);
  },
  // delete role
  deleteRole: function(role) {
    Roles.deleteRole(role.name);
  },
  // add user to role
  
});
