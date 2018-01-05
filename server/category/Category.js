// All Category
Meteor.publish("allCategory", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'categoryCount', Category.find(), {
    noReady: true
  });

  // return category
  return Category.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// application category
Meteor.publish("applicationCategory", function(application) {
  return Category.find({application: application});
});

// Single Category
Meteor.publish("singleCategory", function(categoryId) {
  return Category.find({_id: categoryId});
});
