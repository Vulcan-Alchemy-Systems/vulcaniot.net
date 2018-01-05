

// rendered
Template.MenuNew.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Menu New'
  });

  $('body').scrollTop(0);
};

// helpers
Template.MenuNew.helpers({});

// events
Template.MenuNew.events({
  // submit
  'click .menu-new-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('menuInsertForm');

    formData.insertDoc.created = new Date();
    console.log(formData);
    
    // call update
    Meteor.call('menuCreate',
      formData.insertDoc,
      function (error, result) {
        if(error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Menu was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created menu'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('MenuNew', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
