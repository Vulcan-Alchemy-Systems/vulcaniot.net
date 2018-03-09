import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Expense = new Meteor.Collection("expense");

// rules
Expense.allow({
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



// schema
ExpenseSchema = new SimpleSchema({
  // date
  date: {
    type: Date,
    label: "Date",
    autoform: {
      type: "datetime-local",
    }
  },

  // userId
  userId: {
    type: String,
    label: "User ID",
    autoValue: function () {
      return Meteor.userId();
    },
    autoform: {
      type: "hidden",
    }
  },

  // description
  description: {
    type: String,
    label: "Description",
    autoform: {
      type: "textarea",
    }
  },

  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Hotel",
          value: "Hotel"
        },
        {
          label: "Transport",
          value: "Transport"
        },
        {
          label: "Meals",
          value: "Meals"
        },
        {
          label: "Phones",
          value: "Phones"
        },
        {
          label: "Materials",
          value: "Materials"
        },
        {
          label: "Misc",
          value: "Misc"
        },
        {
          label: "Milage",
          value: "Milage"
        },
      ]
    }
  },

  // amount
  amount: {
    type: String,
    label: "Amount",
  },

  // milageStart
  milageStart: {
    type: String,
    label: "Milage Start",
    optional: true
  },

  // milageEnd
  milageEnd: {
    type: String,
    label: "Milage End",
    optional: true
  },

  // total
  total: {
    type: String,
    label: "Total",
    autoform: {
      type: "hidden",
    }
  },

  // paid
  paid: {
    type: Boolean,
    optional: true,
    label: "Paid",
  },
});


// attach
Expense.attachSchema(ExpenseSchema);

// methods
Meteor.methods({
  // expemseCreate
  expemseCreate: function(expenseEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Expense.insert(expenseEntity);
  },

  // expenseUpdate
  expenseUpdate: function(expenseId, expenseEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Expense.update({_id: expenseId}, expenseEntity);
  },

  // expenseDelete
  expenseDelete: function(expenseId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    Expense.remove({_id: expenseId});
  },

  // expensePaid
  expensePaid: function(expenseId) {

  }
});
