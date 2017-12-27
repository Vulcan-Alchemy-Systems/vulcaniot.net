
Meteor.publish( 'allUsers', function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'userCount', Meteor.users.find(), {
    noReady: true
  });

  return Meteor.users.find({}, {fields: {profile: 1, emails: 1}});
});

Meteor.publish( 'users', function(id) {
  check(id, String);
  return Meteor.users.find({});
});

Meteor.publish( 'singleUser', function(id) {
  return Meteor.users.find({_id: id}, {fields: {profile: 1, emails: 1, roles: 1}});
});
