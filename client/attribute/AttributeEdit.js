// on Created
Template.AttributeEdit.onCreated(function() {
  // auto run
  this.autorun(() => {
    var attributeId = Session.get('AttributeId');

    // subscribe
    this.subscribe('singleAttribute', attributeId);
  });
});

// rendered
Template.AttributeEdit.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Attribute New'
  });

  $('body').scrollTop(0);
};

// helpers
Template.AttributeEdit.helpers({
  attribute: function() {
  var attributeId = Session.get('AttributeId');
    return Attribute.findOne({_id: attributeId});
  }
});

// events
Template.AttributeEdit.events({
  'click .attribute-edit-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('attributeUpdateForm');
    var attributeId = Session.get('AttributeId');

    formData.insertDoc.created = new Date();

    // call update
    Meteor.call('attributeUpdate',
      attributeId, formData.updateDoc,
      function (error, result) {
        if(error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Attribute was saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Attribute menu'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('AttributeEdit', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
