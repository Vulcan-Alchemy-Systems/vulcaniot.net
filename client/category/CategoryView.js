Template.CategoryView.onCreated(function() {
  // auto run
  this.autorun(() => {
    var categoryId = Session.get('CategoryId');
    // subscribe
    this.subscribe('singleCategory', categoryId);
  });
});

// rendered
Template.CategoryView.rendered = function(){
  var categoryId = Session.get('CategoryId');
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Category ' + categoryId
  });

  $('body').scrollTop(0);
};

// helpers
Template.CategoryView.helpers({
  category: function() {
    var categoryId = Session.get('CategoryId');
    return Category.findOne({_id: categoryId});
  }
});
