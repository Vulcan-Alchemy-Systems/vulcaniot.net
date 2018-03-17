// onCreated
Template.JobsBatchProcessTypeDelete.onCreated(function() {
  this.autorun(() => {
    var id = Session.get('JobsBatchProcessTypeId');
    this.subscribe('singleJobsBatchProcessType', id);
  });
});

// helpers
Template.JobsBatchProcessTypeDelete.helpers({
  jobsBatchProcessType: function() {
    var id = Session.get('JobsBatchProcessTypeId');
    var result = JobsBatchProcessType.findOne({_id: id});
    return result;
  }
});

// events
Template.JobsBatchProcessTypeDelete.events({
  // jobs-batch-process-type-delete-submit
  'click .jobs-batch-process-type-delete-submit': function(event) {
      event.preventDefault();

      var id = Session.get('JobsBatchProcessTypeId');

      Meteor.call('jobsBatchProcessTypeDelete', id, function(error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job batch process type has been deleted.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Delete job batch process type #' + id
          });

          // reset session
          Session.set('JobsBatchProcessTypeDelete', false);
        }
      });

      $('body').scrollTop(0);
    },
  });
