// All Category
Meteor.publish("allAttributes", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'attributeCount', Attribute.find(), {
    noReady: true
  });

  // return category
  return Attribute.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// application category
Meteor.publish("applicationAttribute", function(application) {
  return Attribute.find({application: application});
});

// Single Category
Meteor.publish("singleAttribute", function(attributeId) {
  return Attribute.find({_id: attributeId});
});
