
Meteor.publish("allJobs", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'JobsCount', Jobs.find(), {
    noReady: true
  });

  // return
  return Jobs.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

Meteor.publish("allJobsLimit", function(limit) {
  // return
  return Jobs.find({}, {
    limit: limit
  });
});

Meteor.publish("allCustomerJobs", function(customerId, skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'JobsCount', Jobs.find({customerId: customerId}), {
    noReady: true
  });

  // return
  return Jobs.find({customerId: customerId}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

Meteor.publish("singleJob", function(id) {
  return Jobs.find({_id: id});
});
