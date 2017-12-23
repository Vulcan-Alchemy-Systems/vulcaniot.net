// created
Template.ProductList.onCreated(function() {
  this.autorun(() => {
    var jobId = FlowRouter.getParam('id');
  });
});

// helpers
Template.ProductList.helpers({

});

// events
Template.ProductList.events({
  'click .new-product': function(event) {
    Session.set('NewProduct', !Session.get('NewProduct'));
  }
});
