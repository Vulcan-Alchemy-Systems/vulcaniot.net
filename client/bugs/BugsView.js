// onCreated
Template.BugsView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleBug', id);
  });
});

// rendered
Template.BugsView.rendered = function(){
  var id = FlowRouter.getParam('id');
  var bug = Bugs.findOne({_id: id});

  if(bug) {
    Meteor.call('createHistory', {
      userId: Meteor.userId(),
      message: 'Viewed Bug ' + id
    });
  }
};

// helpers
Template.BugsView.helpers({
  // bug
  bug: function() {
    var id = FlowRouter.getParam('id');
    var result =  Bugs.findOne({_id: id});
    return result;
  },
});

// events
Template.BugsView.events({
  // bugs-edit
  'click .bugs-edit': function(event) {
    event.preventDefault();
    Session.set('BugsEdit', ! Session.get('BugsEdit'));
    Session.set('Bug', this);
    Session.set('BugsDelete', false);
    Session.set('BugsNew', false);
  },
  // bugs-delete
  'click .bugs-delete': function(event) {
    event.preventDefault();
    Session.set('BugsDelete', ! Session.get('BugsDelete'));
    Session.set('Bug', this);
    Session.set('BugsEdit', false);
    Session.set('BugsNew', false);
  }
});

// router
FlowRouter.route('/bugs/:id/view', {
  name: 'bugsView',
  parent: 'bugsList',
  title: 'View',
  triggersEnter: [function(context, redirect) {
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'BugsView'});
  },
});
