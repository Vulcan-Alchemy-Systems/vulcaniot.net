import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

//// User admin methods
if (typeof(AdminUser) === 'undefined') {
  AdminUser = {};
  // add callback functions for deletingUserMethod(id), savingUserMethod(options) if you want
  // returning false from those callbacks cancel the delete/save methods
}

Meteor.users.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});


// methods
Meteor.methods({
  addUserToRole: function(data) {
    Roles.addUsersToRoles(data.userId, data.role);
    //Meteor.users.update({_id: data.userId}, {$set: {roles:[data.role]}});
  },
  // toggle user status
  usersToggleStatus: function(id, status){
    Meteor.users.update({_id: id}, {$set: {"profile.status": status}});
  },

  // user count
  userCount: function() {
    return Meteor.users.find({}).count();
  },

  // delete user
  deleteUser: function(options) {
    // options should include: id
    options = options || {};

    if (! (typeof options.id === "string")) {
      throw new Meteor.Error(400, "Required parameter missing");
    }

    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    var user = Meteor.users.findOne({ _id: options.id });
    if (user == null) {
      throw new Meteor.Error(402, "User not found");
    }

    Meteor.users.remove({ _id: options.id });
    console.log("User " + options.id + " deleted");
  },

  // update user
  updateUser: function(options) {
    // options should include: id, username, email, roles
    options = options || {};

    // validate
    if ( !(typeof options.id === "string") ||
      !(typeof options.name === "string") ||
      !(typeof options.email === "string") ) {
      throw new Meteor.Error(400, "Required parameter missing");
    }

    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    var user = Meteor.users.findOne({ _id: options.id });
    if (user == null) {
      throw new Meteor.Error(402, "User not found");
    }

    Meteor.users.update({_id: options.id}, {$set: {"profile.status": options.status, 'profile.name': options.name, emails: [{ "address": options.email, "verified": true}], roles: options.role}});
  },
});
