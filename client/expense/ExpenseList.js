// created
Template.ExpenseList.onCreated(function() {
  this.autorun(() => {
    var userId = Meteor.userId();
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allUserExpense', userId, skipCount);
  });
});

Template.registerHelper( 'milageDisplay', ( type, milageStart, milageEnd ) => {
  if(type == "Milage") {
    return '<span class="text-muted small pull-right">Odometer: '+milageStart+' - '+milageEnd+'</span>';
  }
});

Template.registerHelper( 'amountDisplay', ( type, amount ) => {
  if(type == "Milage") {
    return amount;
  } else {
    var amount = parseFloat(amount);
    return '$' + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
});

// helpers
Template.ExpenseList.helpers({
  // expenses
  expenses: function() {
    return Expense.find({userId: Meteor.userId()}).fetch();
  },

  // pagination
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/profile/expense/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },

  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/profile/expense/:page";
    var params = {page: nextPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },

  prevPageClass: function() {
    return currentPage() <= 1 ? "disabled" : "";
  },

  nextPageClass: function() {
    return hasMorePages() ? "" : "disabled";
  }
});

// events
Template.ExpenseList.events({
  'click .expense-search': function(event) {
    event.preventDefault();
  },
  'click .expense-create': function(event) {
    event.preventDefault();
    Session.set('ExpenseCreate', ! Session.get('ExpenseCreate'));
  },
  'click .expense-export': function(event) {
    event.preventDefault();

  },
  'click .expense-print': function(event) {
    event.preventDefault();
    window.open(FlowRouter.url('expensePrint'), '_blank');
  },
  'click .expense-delete': function(event) {
    event.preventDefault();
    Session.set('ExpenseDelete', ! Session.get('ExpenseDelete'));
  },
  'click .expense-update': function(event) {
    event.preventDefault();
    Session.set('ExpenseUpdate', ! Session.get('ExpenseUpdate'));
  },
  'click .expense-view': function(event) {
    event.preventDefault();
    Session.set('expenseId', this._id);
    Session.set('ExpenseView', ! Session.get('ExpenseView'));
  }
});

// router
FlowRouter.route('/profile/expense/page/:page', {
  name: 'expenseListPage',
  parent: 'profile',
  title: 'Expense',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      //FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'ExpenseList'});
  },
});

FlowRouter.route('/profile/expense', {
  name: 'expenseList',
  parent: 'profile',
  title: 'Expense',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      //FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'ExpenseList'});
  },
});

// pagination
var hasMorePages = function() {
  var totalExpense = Counts.get('expenseCount');
  return currentPage() * parseInt(10) < totalExpense;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
