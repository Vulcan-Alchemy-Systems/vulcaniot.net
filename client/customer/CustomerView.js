// created
Template.CustomerView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleCustomer', id);
    var result =  Customers.findOne({_id: id});
    Session.set('customerData', result);
  });
});

// rendered
Template.CustomerView.rendered = function(){
  var customer = Session.get('customerData');
  if(customer) {
    Meteor.call('createHistory', {
      userId: Meteor.userId(),
      message: 'Viewed Customer ' + customer.name
    });
  }
};

// helpers
Template.CustomerView.helpers({
  customer: function() {
    return Session.get('customerData');
  },
  isCustomerActive: function(status) {
    if(status == 'Active') {
      return 'bg-aqua-active';
    } else {
      return 'bg-red';
    }
  },
  customerStatus: function(status) {
    if(status) {
        return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    } else {
      return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    }
  },
  primaryPhone: function(phones) {
    if(phones) {
      var number = false;
      phones.forEach(function(phone) {
        if(phone.type == 'Primary') {
           number = phone.number;
        }
      });
      if(number) {
        return '<a href="tel:'+number+'" title="Call" style="color:white">' + number + '</a>';
      }
    }
  },
  primaryEmail: function(emails) {
    if(emails) {
      var address = false;
      emails.forEach(function(email) {
        if(email.type == 'Primary') {
           address = email.address;
        }
      });
      if(address) {
        return '<a href="mailto:'+address+'" title="Email" style="color:white">' + address + '</a>'
      }
    }
  }
});

// events
Template.CustomerView.events({
  'click .edit-phone': function(event) {
    Session.set('EditCustomer', !Session.get('EditCustomer'));
  },
  'click .edit-address': function(event) {
    Session.set('EditCustomer', !Session.get('EditCustomer'));
  },
  'click .edit-customer': function(event) {
    Session.set('EditCustomer', !Session.get('EditCustomer'));
  },
  'click .new-product': function(event) {
    Session.set('NewProduct', !Session.get('NewProduct'));
  }
});

// router
FlowRouter.route('/customers/:id/view', {
  name: 'customerView',
  parent: 'customerList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CustomerView'});
  },
});
