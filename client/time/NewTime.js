// helpers
Template.NewTime.helpers({

});

// events
Template.NewTime.events({
  'click .create-time-submit': function(event) {
    var formData = AutoForm.getFormValues('insertTimeForm');
    var userId = FlowRouter.getParam('id');

    formData.insertDoc.userId = userId;

    // call update
    Meteor.call('createTime',
      formData.insertDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Time entry was updated.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created time entry '
          });

          // scrollTop
          $('body').scrollTop(0);

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });
          template.find("form").reset();
        }
      });

  }
});
