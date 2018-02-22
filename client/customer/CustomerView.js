// created
Template.CustomerView.onCreated(function() {
  this.autorun(() => {
    var customerId = FlowRouter.getParam('customerId');
    this.subscribe('singleCustomer', customerId);
  });
});

// rendered
Template.CustomerView.rendered = function(){
  var customerId = FlowRouter.getParam('customerId');
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
    var customerId = FlowRouter.getParam('customerId');
    var result =  Customers.findOne({_id: customerId});
    return result;
  },
});

// events
Template.CustomerView.events({
  // customer-edit
  'click .customer-edit': function() {
    event.preventDefault();
    Session.set('CustomerEdit', !Session.get('CustomerEdit'));
  }
});

// route
FlowRouter.route('/customers/:customerId/view', {
  name: 'customerView',
  parent: 'customerList',
  title: 'View',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      //FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CustomerView'});
  },
});
