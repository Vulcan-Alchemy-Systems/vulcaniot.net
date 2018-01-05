Template.RolesList.onCreated( () => {
  Template.instance().subscribe( 'roles' );
});

// helpers
Template.RolesList.helpers({
  getAllRoles: function() {
    var allRoles = Roles.getAllRoles();
    return allRoles;
  },
});

// events
Template.RolesList.events({
  // create role
  'click .role-create-btn': function() {
    var name = $.trim($('[name=name]').val());

    Meteor.call('createRole', {
      name: name,
    }, function (error) {
      if(error) {
        $('#alert').html('<div class="alert alert-danger"><p>'+error.reason+'</p></div>');
        console.log('Error saving role: ' + error.reason);
      } else {
        $('#alert').html('<div class="alert alert-success"><p>Role was added</p></div>');
      }
    });

    $('[name=name]').val('');
  },

  // delete role
  'click .role-delete-btn': function() {
    Meteor.call('deleteRole', {
      name: this.name,
    }, function (error) {
      if(error) {
        $('#alert').html('<div class="alert alert-danger"><p>'+error.reason+'</p></div>');
        console.log('Error deleteing role: ' + error.reason);
      } else {
        $('#alert').html('<div class="alert alert-success"><p>Role was deleted</p></div>');
      }
    });
  },
  // search role

});


// router
FlowRouter.route('/admin/roles', {
  name: 'roles',
  parent: 'admin',
  title: 'Roles',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'RolesList'});
  },
});
