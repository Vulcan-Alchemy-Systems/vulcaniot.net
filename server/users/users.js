
Meteor.publish( 'users', function() {

  let isAdmin = Roles.userIsInRole( this.userId, 'admin' );

  if ( isAdmin ) {
    return [
      Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1 } } )
    ];
  } else {
    return null;
  }
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
