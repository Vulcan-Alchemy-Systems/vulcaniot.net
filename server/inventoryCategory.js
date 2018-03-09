// All items paginated
Meteor.publish("allInventoryCategory", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'inventoryCategoryCount', InventoryCategory.find(), {
    noReady: true
  });

  // return
  return InventoryCategory.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// All Active
Meteor.publish("activeInventoryCategory", function(id) {
  return InventoryCategory.find({status: "Active"});
});

// Single item
Meteor.publish("singleInventoryCategory", function(id) {
  return InventoryCategory.find({_id: id});
});
