
Meteor.publish( 'users', function() {
  return Meteor.users.find({});
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
