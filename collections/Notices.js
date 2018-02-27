import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Notices = new Meteor.Collection("notices");

// debug
SimpleSchema.debug = true;

// rules
Notices.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
});

// schema
NoticesSchema = new SimpleSchema({
  // topic
  topic: {
    type: String,
    label: "Topic"
  },
  event: {
    type: String,
    label: "Event",
    autoform: {
      type: "hidden",
    }
  },
  // message
  message: {
    type: String,
    label: "Message"
  },
  // created
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
  // read
  read: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  star: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
});

// methods
Meteor.methods({
  // noticesCreate
  noticesCreate: function(topic, event, message) {
    var result = Notices.insert({
      topic: topic,
      event: event,
      message: message
    });

    return result;
  },
  'notices.reset'() {
    Notices.remove({});
  },
  'notices.list'(topic) {
    return Notices.find({topic: topic, read:false}).fetch();
  },
  'notices.count'() {
    return Notices.find().count();
  },
  'notices.read'(id) {
    return Notices.find().count();
  },
  'notices.topic.count'(topic) {
    return Notices.find({topic: topic}).count();
  },
  'notices.latest'(limit) {
    return Notices.find({},{sort: {created: -1}, limit: limit}).fetch();
  },
  'notices.markRead'(id) {
    Notices.update(id, {$set: {read: true}})
  },
  'toggle.notice.star'(id, currentState) {
    Notices.update(id, {
      $set: {
        star: !currentState
      }
    });
  }
});

// attach
Notices.attachSchema( NoticesSchema );
