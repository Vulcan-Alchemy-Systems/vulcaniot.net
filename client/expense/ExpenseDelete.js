Template.ExpenseDelete.onCreated(function() {
  this.autorun(() => {
    var id = Session.get('expenseId');
    this.subscribe('singleExpense', id);
  });
});

// helpers
Template.ExpenseDelete.helpers({
  expense: function() {
    var id = Session.get('expenseId');
    var expense = Expense.findOne({_id: id});
    return expense;
  }
});

// events
Template.ExpenseDelete.events({
  'click .expense-delete-submit': function(event, instance) {
    event.preventDefault();
    var id = Session.get('expenseId');

    Meteor.call('expenseDelete',
      id,
      function (error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Exspense was deleted.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated expense'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('ExpenseUpdate', false);
          Session.set('ExpenseDelete', false);
          Session.set('ExpenseView', false);
          Session.set('expenseId', null);
          
          $('body').scrollTop(0);
        }
      });
  }
});
