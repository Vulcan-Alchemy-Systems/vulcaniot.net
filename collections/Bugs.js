import SimpleSchema from 'simpl-schema';

Bugs = new Meteor.Collection("bugs");

// autoforms
SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

// rules
Bugs.allow({
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
BugsSchema = new SimpleSchema({
  // Title
  title: {
    type: String,
    label: "Title"
  },

  // description
  description: {
    type: String,
    label: "Description",
    autoform: {
      type: "textarea",
    }
  },

  // resolution
  resolution: {
    type: String,
    label: "Resolution",
    optional: true,
    autoform: {
      type: "textarea",
    }
  },

  // status
  status: {
    type: String,
    label: "Status",
    autoform: {
      type: "select",
      options: [
        {
          label: "Uncomfirmed",
          value: "Uncomfirmed"
        },
        {
          label: "New",
          value: "New"
        },
        {
          label: "Assigned",
          value: "Assigned"
        },
        {
          label: "Reopened",
          value: "Reopened"
        },
        {
          label: "Resolved",
          value: "Resolved"
        },
        {
          label: "Verified",
          value: "Verified"
        },
        {
          label: "Closed",
          value: "Closed"
        },
      ]
    }
  },

  // priority
  priority: {
    type: String,
    label: "priority",
    autoform: {
      type: "select",
      options: [
        {
          label: "High",
          value: "High"
        },
        {
          label: "Medium",
          value: "Medium"
        },
        {
          label: "Low",
          value: "Low"
        },
      ]
    }
  },

  // severity
  severity: {
    type: String,
    label: "Severity",
    autoform: {
      type: "select",
      options: [
        {
          label: "Blocker",
          value: "Blocker"
        },
        {
          label: "Critical",
          value: "Critical"
        },
        {
          label: "Major",
          value: "Major"
        },
        {
          label: "Minor",
          value: "Minor"
        },
        {
          label: "Trivial",
          value: "Trivial"
        },
        {
          label: "Enhancement",
          value: "Enhancement"
        },
      ]
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
Bugs.attachSchema(BugsSchema);

// methods
Meteor.methods({
  // bugsCreate
  bugsCreate: function(title, description, resolution, status, priority, severity) {
    var result = Bugs.insert({
      title: title,
      description: description,
      resolution: resolution,
      status: status,
      priority: priority,
      severity: severity
    });

    return result;
  },
  // bugsUpdate
  bugsUpdate: function(id, title, description, resolution, status, priority, severity) {
    var result = Bugs.update(id, {$set: {
      title: title,
      description: description,
      resolution: resolution,
      status: status,
      priority: priority,
      severity: severity
    }});

    return result;
  },
  // bugsDelete
  bugsDelete: function(id) {
    console.log(id);
    Bugs.remove({_id:id});
  }
});
