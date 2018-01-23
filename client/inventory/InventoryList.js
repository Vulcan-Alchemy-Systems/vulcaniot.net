Template.InventoryList.onCreated(function() {
  this.autorun(() => {
    var vendorId = Session.get('VendorId');
    this.subscribe('allVendorInventory', vendorId);
  });
});

// helpers
Template.InventoryList.helpers({
  // gets inventory items for vendor
  inventory: function() {
    var vendorId = Session.get('VendorId');
    var results =  Inventory.find({vendorId: vendorId});
    return results;
  },
});

// events
Template.InventoryList.events({
  // new
  'click .inventory-new': function(event) {
    event.preventDefault();
    Session.set('InventoryNew', ! Session.get('InventoryNew'));
  },
  // edit
  'click .inventory-edit': function(event) {
    event.preventDefault();
    Session.set('InventoryEdit', ! Session.get('InventoryEdit'));
  },
  // delete
  'click .inventory-delete': function(event) {
    event.preventDefault();
    Session.set('InventoryDelete', ! Session.get('InventoryDelete'));
  },
  // view
  'click .inventory-view': function(event) {
    event.preventDefault();
    Session.set('InventoryView', ! Session.get('InventoryView'));
    Session.set('InventoryEntity', this);
    Session.set('InventoryId', this._id);
  }
});

// routes
FlowRouter.route('/admin/inventory/:page', {
  name: 'InventoryListPage',
  parent: 'admin',
  title: 'Inventory',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'InventoryList'});
  },
});

FlowRouter.route('/admin/inventory', {
  name: 'InventoryList',
  parent: 'admin',
  title: 'Inventory',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      //FlowRouter.go('signIn');
    }
  }],
  // action
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'InventoryList'});
  },
});
