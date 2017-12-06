Template.NewTask.events({
  'click .fa-close': function() {
    Session.set('newTask', false);
  }
});
