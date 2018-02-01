Template.ExpenseUpdate.onCreated(function() {
  this.autorun(() => {
    var id = Session.get('expenseId');
    this.subscribe('singleExpense', id);
  });
});

// rendered
Template.ExpenseUpdate.rendered = function() {
  var id = Session.get('expenseId');

  var expense = Expense.findOne({_id: id});
  if(expense) {
    if(expense.type == "Milage") {
      $('.milage-container').hide();
    }
  }
}

// helpers
Template.ExpenseUpdate.helpers({
  expense: function() {
    var id = Session.get('expenseId');
    var expense = Expense.findOne({_id: id});
    return expense;
  }
});

// events
Template.ExpenseUpdate.events({
  'change #type': function(event, instance) {
    event.preventDefault();
    var type = $('#type').val();
    if(type == 'Milage') {
      $('.milage-container').show();
      $('#amount').attr('disabled', true);
    } else {
      $('.milage-container').hide();
      $('#amount').attr('disabled', false);
    }
  },
  'click .expense-update-submit': function(event, instance) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('updateExpenseForm').updateDoc;
    console.log(formData);
    var type = formData.$set.type;
    var id = Session.get('expenseId');

    // if we have milage
    if(type == "Milage") {
      var milageReimbursment = 1.0;
      var totalMilage = formData.$set.milageEnd - formData.$set.milageStart;
      var totalAmount = totalMilage * milageReimbursment;
      formData.$set.amount = totalMilage;
      formData.$set.total = totalAmount;
    }

    console.log(formData.$set)

    // call expemseCreate
    Meteor.call('expenseUpdate',
      id, formData,
      function (error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Exspense was created.</div>');

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

          $('body').scrollTop(0);
        }
      });

  }
});
