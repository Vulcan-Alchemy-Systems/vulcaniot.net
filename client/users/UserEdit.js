Template.UserEdit.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleUser', id);
  });
});

// helpers
Template.UserEdit.helpers({
  // get user
  getUser: ()=> {
    var id = FlowRouter.getParam('id');
    userData =  Meteor.users.findOne({_id: id});
    return userData;
  },
  // get users email
  getUserEmail: function(emails) {
    if(emails) {
      return emails[0].address;
    }
  },

  // is active
  isActive: function(status) {
    if(status == 'Active') {
      return 'selected';
    } else {
      return '';
    }
  },
  // is suspended
  isSuspended: function(status) {
    if(status == 'Suspended') {
      return 'selected';
    } else {
      return '';
    }
  },
});

// events
Template.UserEdit.events({
  'click .cancel-edit-user': function(event) {
    Session.set('EditUser', !Session.get('EditUser'));
  },
  // click edit submit
  'click .edit-user-submit': function() {
      var formData = AutoForm.getFormValues('updateUserForm');
      var id = FlowRouter.getParam('id');

      // call update
      Meteor.call('updateUser',
        id, formData.updateDoc,
        function (error) {
          if(error) {
            $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
          } else {
            $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>User has been saved.</div>');

            // auto dismis
            $("#alert").fadeTo(2000, 500).slideUp(500, function(){
              $("#alert").slideUp(500);
            });

            // reset session
            Session.set('EditUser', !Session.get('EditUser'));
          }
        }
      );
  },
});
