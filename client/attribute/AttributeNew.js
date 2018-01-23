
// rendered
Template.AttributeNew.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Attribute New'
  });

  $('body').scrollTop(0);
};

// helpers
Template.AttributeNew.helpers({});

// events
Template.AttributeNew.events({
  'click .attribute-new-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('attributeInsertForm');

    formData.insertDoc.created = new Date();

    // call update
    Meteor.call('attributeCreate',
      formData.insertDoc,
      function (error, result) {
        if(error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Attribute was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Attribute menu'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('AttributeNew', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
