// created
Template.CustomerView.onCreated(function() {
  this.autorun(() => {
    var customerId = Session.get('CustomerId');
    this.subscribe('singleCustomer', customerId);
  });
});

// rendered
Template.CustomerView.rendered = function(){
  var customerId = Session.get('CustomerId');
  var customer =  Customers.findOne({_id: customerId});

  if(customer) {
    Meteor.call('createHistory', {
      userId: Meteor.userId(),
      message: 'Viewed Customer ' + customer.name
    });
  }
};

// helpers
Template.CustomerView.helpers({
  // customer
  customer: function() {
    var customerId = Session.get('CustomerId');
    var result =  Customers.findOne({_id: customerId});
    return result;
  },
});
