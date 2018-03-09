Meteor.publish( 'roles', function() {
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.roles.find({});
  }
  return Meteor.roles.find({});
});

Meteor.publish( 'singleRole', function(id) {
  check(id, String);
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({_id: id});
  }
  return Meteor.users.find({_id: id});
});
