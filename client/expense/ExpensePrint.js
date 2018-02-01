// created
Template.ExpensePrint.onCreated(function() {
  this.autorun(() => {
    this.subscribe('userReportExpense', Meteor.userId());
    this.subscribe('singleUser', Meteor.userId());
  });
});

// helpers
Template.ExpensePrint.helpers({
  // expenses
  expenses: function() {
    var result = Expense.find({
      userId: Meteor.userId()
    }).fetch();
    return result
  },
  user: function() {
    var result = Meteor.users.findOne({
      _id: Meteor.userId()
    });
    return result;
  },
  total: function() {
    var result = Expense.find({
      userId: Meteor.userId()
    }).fetch();
    var total = 0.0;

    result.forEach(function(expense) {
      total = total + parseFloat(expense.total);
    });
    return total;
  },
  date: function() {
    return moment(new Date()).format(Meteor.settings.public.shortDate);
  },
  address: function(address) {
    return address[0];
  },
  // street address
  streetAddress: function(address) {
    var address = address[0];
    return address.street;
  },
  // city
  city: function(address) {
    var address = address[0];
    return address.city;
  },
  state: function(address) {
    var address = address[0];
    return address.state;
  },
  postal: function(address) {
    var address = address[0];
    return address.postal;
  },
  phone: function(phones) {
    var phone = phones[0];
    return phone.number;
  },
});

// route
FlowRouter.route('/profile/expense/print', {
  name: 'expensePrint',
  parent: 'expenseList',
  title: 'Print',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      //FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('PrintLayout', {
      main: 'ExpensePrint'
    });
  },
});
