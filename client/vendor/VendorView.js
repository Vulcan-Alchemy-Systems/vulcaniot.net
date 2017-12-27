// created
Template.VendorView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleVendor', id);
  });
});

// rendered
Template.VendorView.rendered = function(){
  var VendorEntity = Session.get('VendorEntity');
  // record history event
  if(VendorEntity) {
    Meteor.call('createHistory', {
      userId: Meteor.userId(),
      message: 'Viewed vendor ' + VendorEntity.name
    });
  }
};

// helpers
Template.VendorView.helpers({
  vendor: function() {
    var id = FlowRouter.getParam('id');
    result = Vendors.findOne({_id: id});
    Session.set('VendorEntity', result);
    return result;
  },
  // is active
  isVendorActive: function(status) {
    if(status == "Active") {
      return 'bg-aqua-active';
    } else {
      return 'bg-red';
    }
  },
  // status
  vendorStatus: function(status) {
    if(status) {
        return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    } else {
      return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    }
  },
});

// events
Template.VendorView.events({
  // edit vendor
  'click .vendor-edit': function(event) {
    Session.set('VendorEdit', !Session.get('VendorEdit'));
  },
  // delete vendor
  'click .vendor-delete': function(event) {
    Session.set('VendorDelete', !Session.get('VendorDelete'));
  }
});

// router
FlowRouter.route('/vendors/:id/view', {
  name: 'vendorView',
  parent: 'vendorList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'VendorView'});
  },
});
