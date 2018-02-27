// onCreated
Template.BugsDelete.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleBug', id);
  });
});

// onRendered
Template.BugsDelete.onRendered(function() {});

// helpers
Template.BugsDelete.helpers({
  // bug
  bug: function() {
    var id = FlowRouter.getParam('id');
    var result =  Bugs.findOne({_id: id});
    return result;
  },
});

// events
Template.BugsDelete.events({
  'click .bugs-delete-submit': function(event) {
    event.preventDefault();

    var id = FlowRouter.getParam('id');
    var bug = Bugs.findOne({_id: id});

    Meteor.call('bugsDelete', id, function(error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job has been deleted.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Delete bug #' + id
        });

        // reset session
        Session.set('BugsDelete', false);
        FlowRouter.go('bugsList');
      }
    });
  }
});
