Accounts.onCreateUser(function(options, user) {
    var userCount = Meteor.users.find().count();

    // Use provided profile in options, or create an empty profile object
    user.profile = options.profile || {};

    console.log(userCount + ' users');

    // if this is the first user
    if(userCount == 0) {
      user.roles = ["user", "admin", "employee", "manager", "timeclock", "messages", "notices", "tasks"];
    } else {
      user.roles = ["user"];
    }

    // Returns the user object
    return user;
});
