Template.CategoryDelete.onCreated(function() {
  // auto run
  this.autorun(() => {
    var categoryId = Session.get('CategoryId');
    // subscribe
    this.subscribe('singleCategory', categoryId);
  });
});

// rendered
Template.CategoryDelete.rendered = function(){
  var categoryId = Session.get('CategoryId');
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Category ' + categoryId
  });

  $('body').scrollTop(0);
};

// helpers
Template.CategoryDelete.helpers({
  category: function() {
    var categoryId = Session.get('CategoryId');
    return Category.findOne({_id: categoryId});
  }
});

// events
Template.CategoryDelete.events({
  // submit
  'click .category-delete-submit': function(event) {
    event.preventDefault();
    var categoryId = Session.get('CategoryId');

    // call update
    Meteor.call('categoryDelete',
      categoryId,
      function (error, result) {
        if(error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Category was deleted.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Delete category'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('CategoryDelete', false);
          Session.set('CategoryView', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
