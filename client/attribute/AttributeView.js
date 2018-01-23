// on Created
Template.AttributeView.onCreated(function() {
  // auto run
  this.autorun(() => {
    var attributeId = Session.get('AttributeId');

    // subscribe
    this.subscribe('singleAttribute', attributeId);
  });
});

// rendered
Template.AttributeView.rendered = function(){
  var attributeId = Session.get('AttributeId');
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Attribute ' + attributeId
  });

  $('body').scrollTop(0);
};

// helpers
Template.AttributeView.helpers({
  attribute: function() {
    var attributeId = Session.get('AttributeId');
    return Attribute.findOne({_id: attributeId});
  }
});
