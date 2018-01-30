Template.CategoryEdit.onCreated(function() {
  // auto run
  this.autorun(() => {
    var categoryId = Session.get('CategoryId');
    // subscribe
    this.subscribe('singleCategory', categoryId);
  });
});

// rendered
Template.CategoryEdit.rendered = function(){
  var categoryId = Session.get('CategoryId');
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Category ' + categoryId
  });

  $('body').scrollTop(0);
};

// helpers
Template.CategoryEdit.helpers({
  category: function() {
    var categoryId = Session.get('CategoryId');
    return Category.findOne({_id: categoryId});
  }
});

// events
Template.CategoryEdit.events({
  // submit
  'click .category-edit-submit': function(event) {
    event.preventDefault();

    var categoryId = Session.get('CategoryId');
    var formData = AutoForm.getFormValues('categoryUpdateForm');
    formData.updateDoc.$set.slug = getSlug(formData.updateDoc.$set.name);

    $.each(formData.updateDoc.$set.subCategory, function( i, val ){
      formData.updateDoc.$set.subCategory[i].slug = getSlug(val.name);
      formData.updateDoc.$set.subCategory[i].categorySlug = getSlug(formData.updateDoc.$set.name);
    });

    // call update
    Meteor.call('categoryUpdate',
      categoryId, formData.updateDoc,
      function (error, result) {
        if(error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Category was saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Edit category'
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('CategoryEdit', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});

function getSlug(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}
