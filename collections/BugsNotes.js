import SimpleSchema from 'simpl-schema';

BugsNotes = new Meteor.Collection("bugsNotes");

// autoforms
SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

// rules
BugsNotes.allow({
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

// BugsSchema
BugsNotesSchema = new SimpleSchema({
  // bugsId
  bugsId: {
    type: String,
    label: "Bug",
    autoform: {
      type: "hidden",
    }
  },

  // description

  // note
  note: {
    type: String,
    label: "Note",
    autoform: {
      type: "textarea",
    }
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

  // createdBy
  createdBy: {
    type: String,
    label: "Submited By",
    autoform: {
      type: "hidden",
    },
    autoValue: function () {
      return Meteor.userId();
    },
  },

  // createdByName
  createdByName: {
    type: String,
    label: "Submited By",
    autoform: {
      type: "hidden",
    },
    autoValue: function () {
      return Meteor.user().profile.name;
    },
  },
});

// attach
BugsNotes.attachSchema(BugsNotesSchema);

// methods
Meteor.methods({
  // bugsNotesCreate
  bugsNotesCreate: function(bugsId, note) {
    var result = BugsNotes.insert({
      bugsId: bugsId,
      note: note,
    });

    console.log(bugsId);

    return result;
  },
  // bugsNotesUpdate
  bugsNotesUpdate: function(id, bugsId, note) {
    var result = BugsNotes.update(id, {$set: {
      bugsId: bugsId,
      note: note,
    }});

    return result;
  },
  // bugsNotesDelete
  bugsNotesDelete: function(id) {
    BugsNotes.remove({_id:id});
  }
});
