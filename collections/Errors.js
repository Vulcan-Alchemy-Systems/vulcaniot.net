import SimpleSchema from 'simpl-schema';

// debug
SimpleSchema.debug = true;

Errors = new Meteor.Collection("errors");

// rules
Errors.allow({
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

// ErrorsSchema
ErrorsSchema = new SimpleSchema({
  'application': {
    type: String,
    label: 'application.'
  },
  'date': {
    type: Date,
    label: 'Date'
  },
  'type': {
    type: String,
    allowedValues: [ 'danger', 'warning', 'info', 'success' ],
    label: 'Type'
  },
  'title': {
    type: String,
    label: 'Title'
  },
  'message': {
    type: String,
    label: 'Message'
  },
  'payload': {
    type: Object,
    label: 'Payload',
    optional: true,
    blackbox: true
  }
});

// attach
Errors.attachSchema(ErrorsSchema);

// methods
Meteor.methods({
  recordError: function(application, type, title, message, payload) {
    try {
      var result = Errors.insert({
        application: application ,
        date: new Date(),
        type: type,
        title: title,
        message: message,
        payload: payload
      });
      console.log("Error: " + type + " : " + title);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
});
