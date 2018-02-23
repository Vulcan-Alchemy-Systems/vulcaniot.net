// created
Template.JobNoteDelete.onCreated(function() {
  this.autorun(() => {
    var jobId = Session.get('JobId');
    this.subscribe('singleJob', jobId);
  });
});

Template.JobNoteDelete.helpers({
  // job
  job: function() {
    return Session.get('Job');
  },

  // job note
  jobNote: function() {
    return Session.get('JobNote');
  }
});

// events
Template.JobNoteDelete.events({
  'click .job-note-delete-submit': function(event, instance) {
      event.preventDefault();

      var job = Session.get('Job');
      var jobNote = Session.get('JobNote');

      Meteor.call('jobNoteDelete', job._id, jobNote._id, function(error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job Note was removed.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Job note was removed ' + job._id
          });

          $('body').scrollTop(0);

          // reset session
          Session.set('JobNoteDelete', false);
        }
      });
  }
});
