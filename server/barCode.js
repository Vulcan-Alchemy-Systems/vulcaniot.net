// All Category
Meteor.publish("allBarcodes", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'barCodeCount', BarCode.find(), {
    noReady: true
  });

  // return BarCode
  return BarCode.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});


// Single Code
Meteor.publish("singleBarCode", function(barCodeId) {
  return BarCode.find({_id: barCodeId});
});
