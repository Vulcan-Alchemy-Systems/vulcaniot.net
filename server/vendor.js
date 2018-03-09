// All Vendors
Meteor.publish("allVendors", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'VendorCount', Vendors.find(), {
    noReady: true
  });

  // return
  return Vendors.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// allActiveVendors
Meteor.publish("allActiveVendors", function() {
  return Vendors.find({status: "Active"});
});

// Single Vendor
Meteor.publish("singleVendor", function(id) {
  return Vendors.find({_id: id});
});
