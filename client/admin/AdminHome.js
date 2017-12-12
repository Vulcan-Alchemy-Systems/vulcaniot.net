
// rendered
Template.AdminHome.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Admin Home'
  }, function (error) {
    if(error) {
      $('#alert').html('<div class="alert alert-danger"><p>'+error.reason+'</p></div>');
    } else {

    }
  });
};

// helpers
Template.AdminHome.helpers({
  userCount: function() {
      return Meteor.users.find({}).count();
  }
});

// events
Template.AdminHome.events({});


// router
FlowRouter.route('/admin', {
  name: 'admin',
  parent: 'dashboard',
  title: 'Admin',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'AdminHome'});
  },
});
