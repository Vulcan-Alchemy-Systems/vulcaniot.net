Template.UserDelete.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleUser', id);
  });
});

// helpers
Template.UserDelete.helpers({
  // get user
  getUser: ()=> {
    var id = FlowRouter.getParam('id');
    var userData =  Meteor.users.findOne({_id: id});
    Session.set('userData', userData);
    return userData;
  },
  // get users email
  getUserEmail: function(emails) {
    if(emails) {
      return emails[0].address;
    }
  },
});

// events
Template.UserDelete.events({
  // cancel delete
  'click .user-delete-cancel-btn': function() {
    var id = FlowRouter.getParam('id');
    FlowRouter.go('userView', {id: id});
  },
  // do delete
  'click .user-delete-btn': function() {
    var id = FlowRouter.getParam('id');
    Meteor.call('deleteUser', {
      id: id,
    }, function (error) {
      if(error) {
        $('#alert').html('<div class="alert alert-danger"><p>'+error.reason+'</p></div>');
        console.log('Error deleteing user: ' + error.reason);
      } else {
          FlowRouter.go('userList');
      }
    });
  }
});

FlowRouter.route('/admin/users/:id/delete', {
  name: 'userDelete',
  parent: 'userView',
  title: 'Delete',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserDelete'});
  },
});
