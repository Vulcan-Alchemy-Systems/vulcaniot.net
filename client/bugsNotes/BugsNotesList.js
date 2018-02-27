// onCreated
Template.BugsNotesList.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleBug', id);
    this.subscribe('allBugsNotes', id);
  });
});

// helpers
Template.BugsNotesList.helpers({
  // bugsNotes
  bugsNotes: function() {
    var id = FlowRouter.getParam('id');
    var results = BugsNotes.find({bugsId: id}).fetch();
    return results;
  },
  // bug
  bug: function() {
    var id = FlowRouter.getParam('id');
    var result = Bugs.findOne({_id: id});
    return result;
  }
});


// events
Template.BugsNotesList.events({
  // bugs-notes-new
  'click .bugs-notes-new': function(event) {
    event.preventDefault();
    Session.set('BugsNotesNew', ! Session.get('BugsNotesNew'));
    Session.set('BugsNotesEdit', false);
    Session.set('BugsNotesDelete', false);
  },
  // bugs-notes-edit
  'click .bugs-notes-edit': function(event) {
    event.preventDefault();
    Session.set('BugsNote', this);
    Session.set('BugsNotesEdit', ! Session.get('BugsNotesEdit'));
    Session.set('BugsNotesDelete', false);
    Session.set('BugsNotesNew', false);
  },
  // bugs-notes-delete
  'click .bugs-notes-delete': function(event) {
    event.preventDefault();
    Session.set('BugsNote', this);
    Session.set('BugsNotesDelete', ! Session.get('BugsNotesDelete'));
    Session.set('BugsNotesEdit', false);
    Session.set('BugsNotesNew', false);
  }
});
