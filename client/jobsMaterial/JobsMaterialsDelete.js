// helpers
Template.JobsMaterialsDelete.helpers({
  // JobMaterials
  JobMaterial: function() {
    var JobMaterial = Session.get('JobsMaterial');
    return JobMaterial;
  }
});

// events
Template.JobsMaterialsDelete.events({
  'click .jobs-materials-delete-submit': function(event) {
    event.preventDefault();

    var customerId = FlowRouter.getParam('customerId');
    var jobId = FlowRouter.getParam('jobId');
    var JobMaterial = Session.get('JobsMaterial');

    Meteor.call('JobsMaterialsRemove', JobMaterial._id, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        $('body').scrollTop(0);
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Material has been removed.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Removed job material'
        });

        // clear bar code mapping from original barCode
        Meteor.call('barCodeRemove', JobMaterial.barCode, function(error, result) {
          if(error) {
            $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
            $('body').scrollTop(0);
          }
        });

        // reset session
        Session.set('JobsMaterialsDelete', false);

        $('body').scrollTop(0);
      }
    });
  }
});
