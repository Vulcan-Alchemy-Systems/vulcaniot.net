// onCreated
Template.BugsEdit.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleBug', id);
  });
});

// onRendered
Template.BugsEdit.onRendered(function() {});

// helpers
Template.BugsEdit.helpers({
  // bug
  bug: function() {
    var id = FlowRouter.getParam('id');
    var result =  Bugs.findOne({_id: id});
    return result;
  },
});

// events
Template.BugsEdit.events({
  'click .bugs-edit-submit': function(event) {
    event.preventDefault();

    var id = FlowRouter.getParam('id');
    var bug = Bugs.findOne({_id: id});

    // set up form
    var formData = AutoForm.getFormValues('bugsUpdateForm').updateDoc.$set;

    // call update
    Meteor.call('bugsUpdate', bug._id, formData.title, formData.description, '', formData.status, formData.priority, formData.severity, function(error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {

        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Bug has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function() {
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Created bug'
        });

        // reset session
        Session.set('BugsEdit', false);
      }

      // scroll to top
      $('body').scrollTop(0);
    });
  },
});
