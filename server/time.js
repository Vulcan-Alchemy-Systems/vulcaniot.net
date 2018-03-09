Meteor.publish("allUserTime", function() {
  return Time.find({});
});

Meteor.publish("singleUserTime", function(UserId) {
  return Time.find({userId: UserId});
});

Meteor.publish("singleTime", function(id) {
  return Time.find({_id: id});
});
