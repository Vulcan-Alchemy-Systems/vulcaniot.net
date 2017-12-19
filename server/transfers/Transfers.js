Meteor.publish("allTransfers", function() {
  return Transfers.find({});
});

Meteor.publish("allCustomerTransfers", function(customerId) {
  return Transfers.find({customerId: customerId});
});

Meteor.publish("singleTransfer", function(id) {
  return Transfers.find({_id: id});
});
