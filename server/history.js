Meteor.publish("userHistory", function(userId, skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  check(skipCount, positiveIntegerCheck);

  return History.find({userId: userId}, {limit: Meteor.settings.public.recordsPerPage, skip: skipCount, sort: [['created', 'desc']]});
});

Meteor.publish("singleUserHistory", function(id) {
  return Tasks.find({_id: id});
});
