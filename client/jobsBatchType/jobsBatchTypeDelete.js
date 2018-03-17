// onCreated
Template.JobsBatchTypeDelete.onCreated(function() {
  this.autorun(() => {
    var id = Session.get('JobsBatchTypeId');
    this.subscribe('singleJobsBatchType', id);
  });
});

// helpers
Template.JobsBatchTypeDelete.helpers({
  jobsBatchTypes: function() {
    var id = Session.get('JobsBatchTypeId');
    var result = JobsBatchType.findOne({_id: id});
    console.log(id);
    return result;
  }
});

// events
Template.JobsBatchTypeDelete.events({
  'click .jobs-batch-type-delete-submit': function(event) {
      event.preventDefault();

      var id = Session.get('JobsBatchTypeId');

      Meteor.call('jobsBatchTypeDelete', id, function(error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job has been deleted.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Delete job batch type #' + id
          });

          // reset session
          Session.set('JobsBatchTypeDelete', false);
        }
      });

      $('body').scrollTop(0);
    },
  });
