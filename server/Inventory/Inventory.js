// All Inventory
Meteor.publish("allInventory", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'InventoryCount', Inventory.find(), {
    noReady: true
  });

  // return
  return Inventory.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// vendor eventory
Meteor.publish("allVendorInventory", function(vendorId) {
  return Inventory.find({vendorId: vendorId});
});


// Single Vendor
Meteor.publish("singleInventory", function(id) {
  return Inventory.find({_id: id});
});
