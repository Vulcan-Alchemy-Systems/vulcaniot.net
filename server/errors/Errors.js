// allErrors
Meteor.publish("allErrors", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'ErrorsCount', Errors.find(), {
    noReady: true
  });

  // return
  return Errors.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// applicationErrors
Meteor.publish("applicationErrors", function(application, skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'ErrorsCount', Errors.find({application: application}), {
    noReady: true
  });

  // return
  return Errors.find({application: application}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// singleError
Meteor.publish("singleError", function(id) {
  return Errors.find({_id: id});
});
