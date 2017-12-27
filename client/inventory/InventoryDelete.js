Template.InventoryDelete.onCreated(function() {
  this.autorun(() => {
    this.subscribe('activeInventoryCategory');
    var InventoryEntity = Session.get('InventoryEntity');
    if(InventoryEntity) {
      this.subscribe('singleInventory', InventoryEntity._id);
    }
  });
});

// helpers
Template.InventoryDelete.helpers({
  // gets inventory items for vendor
  inventoryEntity: function() {
    return Session.get('InventoryEntity');
  },
});

// events
Template.InventoryDelete.events({
  'click .inventory-delete-submit': function(event) {
    event.preventDefault();
    var InventoryEntity = Session.get('InventoryEntity');

    // call insert
    Meteor.call('deleteInventory',
      InventoryEntity._id,
      function (error, result) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Inventory Item has been deleted.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'deleted inventory item ' + InventoryEntity.name
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          $('body').scrollTop(0);

          // clear session vars
          Session.set('InventoryEntity', null);
          Session.set('InventoryView', false);
          Session.set('InventoryDelete', false);
          Session.set('InventoryEdit', false);
        }
      }
    );
  }
});
