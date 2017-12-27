
// events
Template.InventoryCategoryNew.events({
  'click .new-inventory-category-submit': function(event) {
    event.preventDefault();

    // get data from form
    var formData = AutoForm.getFormValues('insertInventoryCategoryForm');

    // call update
    Meteor.call('createInventoryCategory',
      formData.insertDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Inventory Category was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created inventory category'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // reset session
          Session.set('InventoryCategoryNew', false);

          // scrollTop
          $('body').scrollTop(0);
        }
      }
    );
  }
});
