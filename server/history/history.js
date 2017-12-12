Meteor.publish("userHistory", function() {
  return History.find({});
});

Meteor.publish("singleUserHistory", function(id) {
  return Tasks.find({_id: id});
});
