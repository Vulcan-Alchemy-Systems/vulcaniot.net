// allBugsNotes
Meteor.publish("allBugsNotes", function(id) {
  return BugsNotes.find({bugsId: id});
});
