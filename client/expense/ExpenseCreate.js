Template.ExpenseCreate.onCreated(function() {
  this.autorun(() => {
  });
});

// rendered
Template.ExpenseCreate.rendered = function(){
  $('.milage-container').hide();
  $('#type').val("");
}

// helpers
Template.ExpenseCreate.helpers({});

// events
Template.ExpenseCreate.events({
  'change #type': function(event, instance) {
    event.preventDefault();
    var type = $('#type').val();
    if(type == 'Milage') {
      $('.milage-container').show();
      $('#amount').attr('disabled', true);
      $('#amount').val('1.00');
    } else {
      $('.milage-container').hide();
      $('#amount').attr('disabled', false);
      $('#amount').val('');
    }
  },

  'click .expense-create-submit': function(event, instance) {
    event.preventDefault();
    var formData = AutoForm.getFormValues('insertExpenseForm').insertDoc;
    var type = formData.type;

    // if we have milage
    if(type == "Milage") {
      var milageReimbursment = 1.0;
      var totalMilage = formData.milageEnd - formData.milageStart;
      var totalAmount = totalMilage * milageReimbursment;
      formData.amount = totalMilage;
      formData.total = totalAmount;
    } else {
      formData.total = formData.amount;
    }

    // call expemseCreate
    Meteor.call('expemseCreate',
      formData,
      function (error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Exspense was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created expense'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('ExpenseCreate', false);

          $('body').scrollTop(0);
        }
      });
  }
});
