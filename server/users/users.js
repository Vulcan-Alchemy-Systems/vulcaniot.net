
Meteor.publish( 'allUsers', function() {
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({});
  }
  return Meteor.users.find({});
});

Meteor.publish( 'singleUser', function(id) {
  check(id, String);
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({_id: id});
  }
  return Meteor.users.find({_id: id});
});

// acctouns create
Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   user.profile.name = options.name;
   user.profile.status = options.status;
   user.profile.createdAt = new Date();
   user.profile.position = options.position;
   user.profile.image = "/images/user2-160x160.jpg";

   return user;
});
