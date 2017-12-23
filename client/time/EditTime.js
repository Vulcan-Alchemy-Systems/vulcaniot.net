
// helpers
Template.EditTime.helpers({
  time: function() {
    return Session.get('TimeData');
  },
});

// events
Template.EditTime.events({
  'click .edit-time-submit': function(event) {
    var formData = AutoForm.getFormValues('updateTimeForm');
    var time = Session.get('TimeData');

    // call update
    Meteor.call('updateTime',
      time._id, formData.updateDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Time entry was updated.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated time entry ' + time._id
          });

          // scrollTop
          $('body').scrollTop(0);

          Session.set('EditTime', false);

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

        }
      });
  }
});
