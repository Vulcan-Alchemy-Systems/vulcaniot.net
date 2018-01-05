Template.UserCustomerEdit.onCreated(function() {
  this.autorun(() => {
    var userId = Session.get('UserCustomerId');
    this.subscribe('singleUser', userId);
  });
});
// helpers
Template.UserCustomerEdit.helpers({
  // user
  user: function() {
    var userId = Session.get('UserCustomerId');
    var userEntity = Meteor.users.findOne({_id: userId});
    return userEntity;
  },
});

// events
Template.UserCustomerEdit.events({
  // edit
  'click .user-customer-edit': function(event) {
    Session.set('UserCustomerEdit', ! Session.get('UserCustomerEdit'));
  },
  // edit submit
  'click .user-customer-edit-submit': function(event) {
    event.preventDefault();

    var userId = Session.get('UserCustomerId');

    // get form data
    var formData = AutoForm.getFormValues('updateUserForm').updateDoc;

    // call update
    Meteor.call('updateUser',
      userId, formData,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
          console.log(error);
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>User has been updated.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // reset session
          Session.set('UserCustomerEdit', ! Session.get('UserCustomerEdit'));
        }
      }
    );
  }
});
