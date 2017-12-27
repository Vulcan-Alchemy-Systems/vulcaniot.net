Template.InventoryEdit.onCreated(function() {
  this.autorun(() => {
    this.subscribe('activeInventoryCategory');
    var InventoryEntity = Session.get('InventoryEntity');
    if(InventoryEntity) {
      this.subscribe('singleInventory', InventoryEntity._id);
    }
  });
});

// helpers
Template.InventoryEdit.helpers({
  // gets inventory items for vendor
  inventoryEntity: function() {
    return Session.get('InventoryEntity');
  },
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
Template.InventoryEdit.events({
  'click .inventory-edit-submit': function(event) {
    event.preventDefault();

    var inventoryEntity = Session.get('InventoryEntity');

    // get form data
    var formData = AutoForm.getFormValues('InventoryUpdateForm').updateDoc;

    // call insert
    Meteor.call('updateInventory',
      inventoryEntity._id, formData,
      function (error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Inventory Item has been saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated inventory item ' + formData.name
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          $('body').scrollTop(0);

          Session.set('InventoryEntity', Inventory.findOne({_id: inventoryEntity._id}));

          // set edit to false
          Session.set('InventoryEdit', false);
        }
      }
    );
  }
});
