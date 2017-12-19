// All Locations
Meteor.publish("allLocations", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'LocationCount', Locations.find(), {
    noReady: true
  });

  // return
  return Locations.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// Active Only
Meteor.publish("allActiveLocations", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'LocationCount', Locations.find({status: 'Active'}), {
    noReady: true
  });

  // return
  return Locations.find({status: 'Active'}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// Single Location
Meteor.publish("singleLocation", function(id) {
  return Locations.find({_id: id});
});
