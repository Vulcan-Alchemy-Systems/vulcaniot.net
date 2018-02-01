// created
Template.ExpenseView.onCreated(function() {
  this.autorun(() => {
    var id = Session.get('expenseId');
    this.subscribe('singleExpense', id);
  });
});

// helpers
Template.ExpenseView.helpers({
  // expenses
  expense: function() {
    var id = Session.get('expenseId');
    return Expense.findOne({_id: id});
  },
});
