Template.UserCustomerPassword.onCreated(function() {
  this.autorun(() => {
    var userId = Session.get('UserCustomerId');
    this.subscribe('singleUser', userId);
  });
});

// helpers
Template.UserCustomerPassword.helpers({
  users: function() {
    var vendorId = FlowRouter.getParam('id');
    var users = Meteor.users.find({'profile.vendorId': vendorId}, {fields: {profile: 1, emails: 1}});
    return users;
  },
});

// events
Template.UserCustomerPassword.events({
  // password
  'click .user-customer-password': function(event) {
    event.preventDefault();
    Session.set('UserCustomerPassword', ! Session.get('UserCustomerPassword'));
  },


  'click .user-customer-password-submit': function(event) {
    event.preventDefault();
    var userId = Session.get('UserCustomerId');
    var password = $('#password').val();
    console.log(userId);
    // call
    Meteor.call('userResetPassword', userId, password, function (error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Password was reset.</div>');
      }
    });

    // auto dismis
    $("#alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#alert").slideUp(500);
    });

    // record history

    Session.set('UserCustomerPassword', false);
  }
});
