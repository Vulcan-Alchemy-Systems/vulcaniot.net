// on Created
Template.AttributeDelete.onCreated(function() {
  // auto run
  this.autorun(() => {
      var attributeId = Session.get('AttributeId');

    // subscribe
    this.subscribe('singleMenu', menuId);
  });
});

// rendered
Template.AttributeDelete.rendered = function(){
    var attributeId = Session.get('AttributeId');
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Deleted Attribute ' + attributeId
  });

  $('body').scrollTop(0);
};

// helpers
Template.AttributeDelete.helpers({
  attribute: function() {
    var attributeId = Session.get('AttributeId');
    return Attribute.findOne({_id: attributeId});
  }
});
