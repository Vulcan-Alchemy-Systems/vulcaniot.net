// on Created
Template.ProductNew.onCreated(function() {
  // auto run
  this.autorun(() => {
    this.subscribe('rootCategory');
  });
});

// rendered
Template.ProductNew.rendered = function() {
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Product New'
  });
  $('body').scrollTop(0);
};

// helpers
Template.ProductNew.helpers({
  productCategories: function() {
    var items = Category.find({}).fetch();
    var options = [];
    Session.set('RootCategory', items);
    items.forEach(function(item) {
      options.push({
        label: item.name,
        value: item.name
      })
    });
    return options;
  },
});

// events
Template.ProductNew.events({
  'change #category': function(event, instance) {
    var category = $('#category').val();
    var rootCategory = Session.get('RootCategory');
    $('#subCategory').find('option').remove();

    // loop though all of them and pull out the subs
    rootCategory.forEach(function(cat) {
      if (cat.name == category) {
        cat.subCategory.forEach(function(sub) {
          $('#subCategory').append($("<option></option>")
            .attr("value", sub.name)
            .text(sub.name));
        });
      }
    });
  },

  // submit
  'click .product-new-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('productInsertForm');
    formData.insertDoc.created = new Date();

    // call update
    Meteor.call('productCreate',
      formData.insertDoc,
      function(error, result) {
        if (error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Product was created.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created product'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function() {
            $("#alert").slideUp(500);
          });

          Session.set('ProductNew', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
