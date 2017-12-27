Template.InventoryView.onCreated(function() {
  this.autorun(() => {
    var InventoryEntity = Session.get('InventoryEntity');
    if(InventoryEntity) {
      this.subscribe('singleInventory', InventoryEntity._id);
    }
  });
});

// helpers
Template.InventoryView.helpers({
  // gets inventory items for vendor
  inventoryEntity: function() {
    return Session.get('InventoryEntity');
  },
});
