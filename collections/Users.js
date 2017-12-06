import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);



Meteor.users.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});


// methods
Meteor.methods({
  usersToggleStatus: function(id, status){
    Meteor.users.update({_id: id}, {$set: {"profile.status": status}});
  },
});
