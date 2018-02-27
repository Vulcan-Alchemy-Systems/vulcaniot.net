// onCreated
Template.UserTimeWidget.onCreated(function() {
  this.autorun(() => {});
});

// onRendered
Template.TimeNew.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

// events
Template.TimeNew.events({
  // time-new-submit
  'click .time-new-submit': function(event) {
    var formData = AutoForm.getFormValues('insertTimeForm');
    var userId   = Session.get('UserId');
    var created  = $('#created').val();
    var action   = formData.insertDoc.action;

    // if no session id then get it from the param
    if(! userId) {
      var userId = FlowRouter.getParam('id');
    }

    // record error @todo
    if(! userId) {
      throw new Meteor.Error('user-id-not-found', "User id not found.");
    }

    // call createTime
    Meteor.call('createTime',
      userId, created, action,
      function (error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Time entry was updated.</div>');

          console.log(result);

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created time entry '
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // clear Session
          Session.set('TimeNew', false);
        }

        // scrollTop
        $('body').scrollTop(0);
      });
  }
});
