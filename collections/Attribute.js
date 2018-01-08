import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Attribute = new Meteor.Collection("attribute");

// rules
Attribute.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

//schemas
AttributeSchema = new SimpleSchema(
  
);

// attach
Attribute.attachSchema(AttributeSchema);

// methods
Meteor.methods({
  // create
  attributeCreate: function(attributeEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Attribute.insert(attributeEntity);
  },

  // update
  attributeUpdate: function(attributeId, attributeEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Attribute.update({_id: attributeId}, attributeEntity);
  },

  // delete
  attributeDelete: function(attributeId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    Attribute.remove({_id: attributeId});
  }
});
