import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Time = new Mongo.Collection("time");

// debug
SimpleSchema.debug = true;


// rules
Time.allow({
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
TimeSchema = new SimpleSchema({
  // userId
  userId: {
    type: String,
    label: "User",
    autoValue: function () {
      return this.userId
    },
    autoform: {
      type: "hidden",
    }
  },
  // created
  created: {
    type: Date,
    label: "Date",
    autoform: {
      type: "datetime-local",
    }
  },
  // action
  action: {
    type: String,
    label: "Action",
    autoform: {
      type: "select",
      options: [
        {
          label: "In",
          value: "In"
        },
        {
          label: "Out",
          value: "Out"
        },
      ]
    }
  },
});

// methods
Meteor.methods({
  // clock user in
  clockUserIn: function(userId, created){
    // if we are not signed in
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    // validate
    if ( !(typeof userId === "string") ||
      !(typeof created === "string") ) {
      throw new Meteor.Error(400, "Required parameter missing");
    }

    // save time
    var result = Time.insert({
      userId: userId ,
      created: created,
      action: "In"
    });

    // set user to clocked in
    Meteor.users.update({_id: userId}, {$set: {"profile.clockedIn": true}});

    return result;
  },

  // clock user out
  clockUserOut: function(userId, created) {
    // if we are not signed in
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    // validate
    if ( !(typeof userId === "string") ||
      !(typeof created === "string") ) {
      throw new Meteor.Error(400, "Required parameter missing");
    }

    // save time
    var result = Time.insert({
      userId: userId ,
      created: created,
      action: "Out"
    });

    // set user to clocked in
    Meteor.users.update({_id: userId}, {$set: {"profile.clockedIn": false}});

    return result;
  },

  // get user times
  getUserTimes: function(userId) {
    return Time.find({userId: userId},  {"sort" : [['created', 'desc']]}).fetch();
  },

  // createTime
  createTime: function(userId, created, action) {
    // save time
    var result = Time.insert({
      userId: userId ,
      created: created,
      action: action
    });

    return result;
  },

  // update time
  updateTime: function(id, data) {
    // if we are not signed in
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Time.update({_id:id}, data);
  },

  // delete time
  deleteTime: function(data) {
    // if we are not signed in
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }
    Time.remove({_id:data.id});
  },

  // download
  download: function(userId, startDate, endDate,) {
    if(startDate && endDate) {
        var collection = Time.find({userId: userId, created: {$gte: new Date(startDate), $lt: new Date(endDate)}}, {"sort" : [['created', 'desc']]}).fetch();
    } else {
        var collection = Time.find({userId: userId}, {"sort" : [['created', 'desc']]}).fetch();
    }

    var heading = true; // Optional, defaults to true
    var delimiter = "," // Optional, defaults to ",";

    return exportcsv.exportToCSV(collection, heading, delimiter);
  },

  // searchDate
  timeSearchDate: function(startDate, endDate, userId) {
    result = Time.find({userId: userId, created: {$gte: new Date(startDate), $lt: new Date(endDate)}}, {"sort" : [['created', 'desc']]}).fetch();
    return result;
  },
});

// attach
Time.attachSchema( TimeSchema );
