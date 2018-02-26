Meteor.publish("allBugs", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'BugsCount', Bugs.find(), {
    noReady: true
  });

  // return
  return Bugs.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

Meteor.publish("singleBug", function(id) {
  return Bugs.find({_id: id});
});
