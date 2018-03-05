// created
Template.DeviceView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleDevice', id);
  });
});

// rendered
Template.DeviceView.rendered = function(){
  var id = FlowRouter.getParam('id');

  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Device #' + id
  });
};

// helpers
Template.DeviceView.helpers({
  // device
  device: function() {
    var id = FlowRouter.getParam('id');

    var result = Device.findOne({'_id': id});

    return result;
  },
});

// router
FlowRouter.route('/devices/:id/view', {
  name: 'deviceView',
  parent: 'deviceList',
  title: 'View',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {

    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'DeviceView'});
  },
});
