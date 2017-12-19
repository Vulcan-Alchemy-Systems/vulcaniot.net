Meteor.publish("allCustomers", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'customerCount', Customers.find(), {
    noReady: true
  });

  // return customers
  return Customers.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });

});

Meteor.publish("allActiveCustomers", function() {
  return Customers.find({status: 'Active'});
});

Meteor.publish("singleCustomer", function(id) {
  return Customers.find({_id: id});
});
