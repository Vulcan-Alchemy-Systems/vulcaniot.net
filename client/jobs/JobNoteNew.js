Template.JobNoteNew.helpers({
  job: function() {
    return Session.get('Job');
  }
});

// events
Template.JobNoteNew.events({
  'click .job-note-new-submit': function(event, instance) {
    event.preventDefault();

    var job = Session.get('Job');
    
    var note = instance.$('#note').val();
    var customerView = instance.$('#customerView').prop('checked');

    // call update
    Meteor.call('jobNoteCreate', job._id, note, customerView, function(error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Note has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Added a note to job ' + job._id
        });

        $('body').scrollTop(0);

        // reset session
        Session.set('JobNoteNew', false);
      }
    });
  },
});
