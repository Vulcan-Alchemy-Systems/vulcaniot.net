Meteor.publish('files.images.all', () => {
  return images.collection.find({});
});
