Template.UserView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleUser', id);
    this.subscribe('roles');
    var userData = Meteor.users.findOne({_id: id});
    if(userData) {
      Session.set('userData', userData);
    }
  });

});

// rendered
Template.UserView.rendered = function(){
  var userData = Session.get('userData');
  if(userData) {
    Meteor.call('createHistory', {
      userId: Meteor.userId(),
      message: 'Viewed user ' + userData.profile.name
    });
  }
};

Template.registerHelper('isUserInRole', function(userId, role) {
  return Roles.userIsInRole(userId, role);
});

// helpers
Template.UserView.helpers({
  // get user
  getUser: ()=> {
    return Session.get('userData');
  },
  // get users email
  getUserEmail: function() {
    var userData = Session.get('userData');
    if(userData) {
      var emails = userData.emails;
      if(emails) {
        return emails[0].address;
      }
    }
  },
  // date format
  dateFormat: function(date) {
    return moment(date).format(Meteor.settings.public.longDate);
  },
  dateShortFormat: function(date) {
    return moment(date).format(Meteor.settings.public.shortDate);
  },
  // get all Roles for dropdown
  listRoles: function() {
    return Roles.getAllRoles();
  },
  // get all roles a user belongs to
  listUserRoles: function() {
    var roles = Roles.getRolesForUser(Session.get('userData'));
    return roles;
  },
});

// events
Template.UserView.events({
  'click .add-role-to-users': function(event) {
    var role = $.trim($('[name=role]').val());
    var userId = FlowRouter.getParam('id');

    Meteor.call('addUserToRole', {
      userId: userId,
      role: role
    }, function (error) {
      if(error) {
        $('#alert').html('<div class="alert alert-danger"><p>'+error.reason+'</p></div>');
        console.log('Error adding user to role: ' + error.reason);
      } else {
        $('#alert').html('<div class="alert alert-success"><p>Role was added to user</p></div>');
      }
    });

  },
  'click .remove-role': function(event) {
      console.log(this);
  },
  'click .edit-user': function(event) {
    Session.set('EditUser', !Session.get('EditUser'));
  }
});


FlowRouter.route('/admin/users/:id/view', {
  name: 'userView',
  parent: 'userList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'UserView'});
  },
});
