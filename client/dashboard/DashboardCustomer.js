// created
Template.DashboardCustomer.onCreated(function() {
  this.autorun(() => {
    var customerId = Meteor.user().profile.customerId;
    Session.set('CustomerId', customerId);
    this.subscribe('singleCustomer', customerId);
  });
});

// rendered
Template.DashboardCustomer.rendered = function(){


};

// helpers
Template.DashboardCustomer.helpers({
  customer: function() {
    var customerId = Meteor.user().profile.customerId;
    var result =  Customers.findOne({_id: customerId});
    return result;
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
Template.DashboardCustomer.events({
  'click .job-new': function(event) {
    event.preventDefault();
    Session.set('JobId', this._id);
    Session.set('JobNew', !Session.get('JobNew'));
  },
});
