import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Tasks = new Mongo.Collection("tasks");

// debug
SimpleSchema.debug = true;

// rules
Tasks.allow({
  insert: function (userId, doc) {
    return !!userId;
  },
  update: function (userId, doc) {
    return !!userId;
  },
  remove: function (userId, doc) {
    return !!userId;
  },
});

// schema
TaskSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
  },
  description: {
    type: String,
    label: "Description",
    autoform: {
      type: "textarea"
    }
  },
  completed: {
    type: Boolean,
    label: "Completed",
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function () {
      return this.userId
    },
    autoform: {
      type: "hidden",
    }
  },
  due: {
    type: Date,
    label: "Task Due",
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  }
});

// methods
Meteor.methods({
  toggleTaskCompleted: function(id, currentState){
    Tasks.update(id, {
      $set: {
        completed: !currentState
      }
    });
  },
  deleteTask: function(id) {
    Tasks.remove({_id:id});
  }
});

// attach
Tasks.attachSchema( TaskSchema );
