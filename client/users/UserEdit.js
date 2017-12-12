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
    //console.log(userData);
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
  // click edit submit
  'click .user-edit-submit': function() {
    // fields from form
    var name = $.trim($('[name=name]').val());
    var email = $.trim($('[name=email]').val());
    var status = $.trim($('[name=status]').val());
    var role = $.trim($('[name=role]').val());
    var id = $.trim($('[name=id]').val());

    // call update
    Meteor.call('updateUser', {
      id: id,
      name: name,
      email: email,
      status: status,
      roles: role,
    }, function (error) {
      if(error) {
        $('#alert').html('<div class="alert alert-danger"><p>'+error.reason+'</p></div>');
        console.log('Error saving user changes: ' + error.reason);
      }
    });

    // redirect
    FlowRouter.go('userView', {id: id});
  },
});
