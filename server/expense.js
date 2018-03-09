Meteor.publish("allExpense", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'ExpenseCount', Expense.find(), {
    noReady: true
  });

  // return
  return Expense.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

Meteor.publish("allUserExpense", function(userId, skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'ExpenseCount', Expense.find({userId: userId}), {
    noReady: true
  });

  // return
  return Expense.find({userId: userId}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

Meteor.publish("userReportExpense", function(userId) {
  return Expense.find({userId: userId});
});

Meteor.publish("singleExpense", function(id) {
  return Expense.find({_id: id});
});
