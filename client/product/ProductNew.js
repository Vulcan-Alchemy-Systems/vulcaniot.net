// on Created
Template.MenuList.onCreated(function() {
  // auto run
  this.autorun(() => {
    // subscribe
    this.subscribe('files.images.all');
  });
});

// rendered
Template.ProductNew.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Product New'
  });

  $('body').scrollTop(0);
};

// helpers
Template.ProductNew.helpers({});

// events
Template.ProductNew.events({
  // submit
  'click .product-new-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('productInsertForm');
    formData.insertDoc.created = new Date();

    // call update
    Meteor.call('productCreate',
      formData.insertDoc,
      function (error, result) {
        if(error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Product was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created product'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('ProductNew', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
