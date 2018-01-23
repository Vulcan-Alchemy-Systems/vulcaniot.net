// created
Template.JobNoteEdit.onCreated(function() {
  this.autorun(() => {
    var jobId = Session.get('JobId');
    this.subscribe('singleJob', jobId);
  });
});

Template.JobNoteEdit.helpers({
  // job
  job: function() {
    return Session.get('Job');
  },

  // job note
  jobNote: function() {
    return Session.get('JobNote');
  },

  // customerView
  customerView: function() {
    var jobNote = Session.get('JobNote');

    if(jobNote.customerView) {
      return 'checked';
    }
  }
});

// events
Template.JobNoteEdit.events({
  'click .job-note-edit-submit': function(event, instance) {
      event.preventDefault();

      var job = Session.get('Job');
      var jobNote = Session.get('JobNote');

      var note = instance.$('#note').val();
      var customerView = instance.$('#customerView').prop('checked');

      Meteor.call('jobNoteUpdate', job._id, jobNote._id, note, customerView, function(error) {
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
            message: 'Updated job note ' + jobNote._id
          });

          $('body').scrollTop(0);

          // reset session
          Session.set('JobNoteEdit', false);
        }
      });
  }
});
