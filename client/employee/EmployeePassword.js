// onCreated
Template.EmployeePassword.onCreated(function() {
  this.autorun(() => {
    var userId = FlowRouter.getParam('id');
    Session.set('UserId',userId);
    this.subscribe('singleUser', userId);
  });
});

// events
Template.EmployeePassword.events({
  'click .employee-password-submit': function(event) {
    event.preventDefault();

    var userId = FlowRouter.getParam('id');
    var password = $('#password').val();

    // call
    Meteor.call('userResetPassword', userId, password, function (error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Password was reset.</div>');
      }

      // auto dismis
      $("#alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#alert").slideUp(500);
      });

      Session.set('EmployeePassword', false);
    });
  }
});
