// All Menu
Meteor.publish("allMenu", function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });

  // check
  check(skipCount, positiveIntegerCheck);

  // publish counts
  Counts.publish(this, 'menuCount', Menu.find(), {
    noReady: true
  });

  // return Menu
  return Menu.find({}, {
    limit: Meteor.settings.public.recordsPerPage, skip: skipCount
  });
});

// application Menu
Meteor.publish("applicationMenu", function(application, name, active) {
  return Menu.find({});
});

// Single Menu
Meteor.publish("singleMenu", function(menuId) {
  return Menu.find({_id: menuId});
});
