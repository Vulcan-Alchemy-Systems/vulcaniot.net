import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

History = new Meteor.Collection("history");

// debug
SimpleSchema.debug = true;


// rules
History.allow({
  insert: function (userId, doc) {
    return true;
  },
});

// schema
HistorySchema = new SimpleSchema({
  // userId
  userId: {
    type: String,
    autoValue: function () {
      return this.userId
    },
    autoform: {
      type: "hidden",
    }
  },
  // Created
  created: {
    type: Date,
    label: "Created",
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  },
  // message
  message: {
    type: String,
    label: "Event",
    autoform: {
      type: "textarea"
    }
  },
});


// methods
Meteor.methods({
  // createHistory
  createHistory: function(options) {
    options = options || {};

    // if we are not signed in
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    // validate we got data
    if ( !(typeof options.userId === "string") ||
      !(typeof options.message === "string") ) {
      throw new Meteor.Error(400, "Required parameter missing");
    }

    // save
    var result = History.insert({
      userId: options.userId ,
      message: options.message,
      created: new Date()
    });
  },
  // get User History
  getUserHistory: function(userId) {
    return History.find({userId: userId},  {"sort" : [['created', 'desc']]} ).fetch();
  }
});

// attach
History.attachSchema(HistorySchema);
