// all users
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

// all employees

// all customer users
Meteor.publish( 'allCustomerUsers', function(customerId, skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'userCount', Meteor.users.find({'profile.customerId': customerId}), {
    noReady: true
  });

  return Meteor.users.find({'profile.customerId': customerId}, {fields: {profile: 1, emails: 1}});
});

// all vendor users
Meteor.publish( 'allVendorUsers', function(vendorId, skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'userCount', Meteor.users.find({'profile.vendorId': vendorId}), {
    noReady: true
  });

  return Meteor.users.find({'profile.vendorId': vendorId}, {fields: {profile: 1, emails: 1}});
});

// users
Meteor.publish( 'users', function(id) {
  check(id, String);
  return Meteor.users.find({});
});

// single user
Meteor.publish( 'singleUser', function(id) {
  return Meteor.users.find({_id: id}, {fields: {profile: 1, emails: 1, roles: 1}});
});
