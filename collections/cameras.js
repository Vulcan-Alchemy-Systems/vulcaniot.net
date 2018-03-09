import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Cameras = new Meteor.Collection("cameras");

Cameras.allow({
  insert: function (userId, doc) {
    console.log(doc)
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

CamerasSchema = new SimpleSchema({
  // locationId

  // roomId

  // location


});

// attach
Cameras.attachSchema(CamerasSchema);

// methods
Meteor.methods({
  
});
