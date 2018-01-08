// rendered
Template.CategoryNew.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Category New'
  });

  $('body').scrollTop(0);
};

// helpers
Template.CategoryNew.helpers({});

// events
Template.CategoryNew.events({
  // submit
  'click .category-new-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('categoryInsertForm');
    formData.insertDoc.created = new Date();

    // call update
    Meteor.call('categoryCreate',
      formData.insertDoc,
      function (error, result) {
        if(error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Category was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created category'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('CategoryNew', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
