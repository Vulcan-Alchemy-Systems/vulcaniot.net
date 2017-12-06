import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Messages = new Meteor.Collection("messages");

// rules
Messages.allow({
  insert: function() {
    return true;
  }
});

// schema
MessagesSchema = new SimpleSchema({
  // toName
  toName: {
    type: String,
    label: "To"
  },

  // toId
  toId: {
    type: String,
    autoform: {
      type: "hidden",
    }
  },

  // subject
  subject: {
    type: String,
    label: "Subject"
  },

  // body
  body: {
    type: String,
    label: "Message",
    autoform: {
      type: "textarea"
    }
  },

  // fromName
  fromName: {
    type: String,
    autoform: {
      type: "hidden",
    }
  },

  // fromId
  fromId: {
    type: String,
    autoform: {
      type: "hidden",
    }
  },

  // createdDate
  createdDate: {
    type: Date,
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  },

  // readFlag
  readFlag: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },

  // readDate
  readDate: {
    type: Date,
    autoform: {
      type: "hidden",
    }
  },

  // starFlag
  starFlag: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },

  // deleteFlag
  deleteFlag: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },

  // deleteDate
  deleteDate: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  }
});

// attach
Messages.attachSchema( MessagesSchema );

// methods
Meteor.methods({
  'messages.reset'() {
    Messages.remove({});
  },
  'messages.list'() {
    return Messages.find({}).fetch();
  },
  'messages.count'() {
    return Messages.find({}).count();
  }
});
