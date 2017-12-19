import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

Messages = new Meteor.Collection("messages");

// rules
Messages.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
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
    optional: true,
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
    type: Date,
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
  messageMarkRead: function(id) {
    var result = Messages.update(id, {$set: {readFlag: true, readDate: Date()}});
    return result;
  },
  // toggle star
  messagesMarkStar: function(id, currentState) {
    var result = Messages.update(id, {$set: {starFlag: !currentState}});
    return result;
  },
  // delete message
  messagesDelete: function(id) {
    var result = Messages.update(id, {$set: {deleteFlag: true, deleteDate: Date()}});
    return result;
  },
  // messagesUnDelete
  messagesUnDelete: function(id) {
    console.log(id);
    var result = Messages.update(id, {$set: {deleteFlag: false, deleteDate: Date()}});
    return result;
  },
  // create message
  messagesCreate: function(toName, toId, subject, body, fromName, fromId, createdDate, readFlag, readDate, starFlag, deleteFlag, deleteDate) {

    // if we are not signed in
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    console.log(typeof createdDate);

    // validate
    if (!(typeof toName === "string")) {
      throw new Meteor.Error(400, "Required parameter toName is missing");
    }
    if (!(typeof toId === "string")) {
      throw new Meteor.Error(400, "Required parameter toId is missing");
    }
    if (!(typeof subject === "string")) {
      throw new Meteor.Error(400, "Required parameter subject is missing");
    }
    if (!(typeof body === "string")) {
      throw new Meteor.Error(400, "Required parameter body is missing");
    }
    if (!(typeof fromName === "string")) {
      throw new Meteor.Error(400, "Required parameter fromName is missing");
    }
    if (!(typeof fromId === "string")) {
      throw new Meteor.Error(400, "Required parameter fromId is missing");
    }
    if (!(typeof createdDate === "object")) {
      throw new Meteor.Error(400, "Required parameter createdDate is missing");
    }
    if (!(typeof readFlag === "string")) {
      throw new Meteor.Error(400, "Required parameter readFlag is missing");
    }
    if (!(typeof readDate === "string")) {
      throw new Meteor.Error(400, "Required parameter readDate is missing");
    }
    if (!(typeof starFlag === "string")) {
      throw new Meteor.Error(400, "Required parameter starFlag is missing");
    }
    if (!(typeof deleteFlag === "string")) {
      throw new Meteor.Error(400, "Required parameter deleteFlag is missing");
    }

    // save time
    var result = Messages.insert({
      toName: toName ,
      toId: toId,
      subject: subject,
      body: body,
      fromName: fromName,
      fromId: fromId,
      createdDate: createdDate,
      readFlag: readFlag,
      readDate: readDate,
      starFlag: starFlag,
      deleteFlag: deleteFlag,
      deleteDate: deleteDate
    });

    return result;
  }

});
