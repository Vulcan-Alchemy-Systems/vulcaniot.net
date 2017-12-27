Template.InventoryNew.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('activeInventoryCategory');
    this.subscribe('singleVendor', id);
  });
});

// helpers
Template.InventoryNew.helpers({
  // gets categories for dropDown
  inventoryCategories: function() {
    var items = InventoryCategory.find({status: "Active"});
    var options = [];

    items.forEach(function(item){
      options.push({
        label: item.name,
        value: item.name
      })
    });

    return options;
  }
});

// events
Template.InventoryNew.events({
  'click .inventory-new-submit': function(event) {
    event.preventDefault();

    // vendor
    var id = FlowRouter.getParam('id');
    var vendorEntity = Vendors.findOne({_id: id});

    // get form data
    var formData = AutoForm.getFormValues('insertInventoryForm').insertDoc;

    // set vendorID and name
    formData.vendorId = id;
    formData.vendorName = vendorEntity.name;

    // set dates
    formData.createdAt = new Date();
    formData.lastModified = new Date();

    // call insert
    Meteor.call('createInventory',
      formData,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Inventory Items has been saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created inventory item '
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          $('body').scrollTop(0);

          // set edit to false
          Session.set('InventoryNew', !Session.get('InventoryNew'));
        }
      }
    );
  }
});
