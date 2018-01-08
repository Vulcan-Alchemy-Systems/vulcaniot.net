// on Created
Template.MenuEdit.onCreated(function() {
  // auto run
  this.autorun(() => {
    var menuId = Session.get('MenuId');

    // subscribe
    this.subscribe('singleMenu', menuId);
  });
});

// rendered
Template.MenuEdit.rendered = function(){
  var menuId = Session.get('MenuId');
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Edit Menu ' + menuId
  });

  $('body').scrollTop(0);
};

// helpers
Template.MenuEdit.helpers({
  menuItem: function() {
    var menuId = Session.get('MenuId');
    return Menu.findOne({_id: menuId});
  }
});

// events
Template.MenuEdit.events({
  // submit
  'click .menu-edit-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('menuUpdateForm');
    var menuId = Session.get('MenuId');

    formData.insertDoc.created = new Date();
    console.log(formData);

    // call update
    Meteor.call('menuUpdate',
      menuId, formData.updateDoc,
      function (error, result) {
        if(error) {
          $('body').scrollTop(0);
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Menu was updated.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated menu ' + menuId
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          Session.set('MenuEdit', false);

          $('body').scrollTop(0);
        }
      }
    );
  }
});
