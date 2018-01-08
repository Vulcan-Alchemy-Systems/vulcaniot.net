// on Created
Template.MenuDelete.onCreated(function() {
  // auto run
  this.autorun(() => {
    var menuId = Session.get('MenuId');

    // subscribe
    this.subscribe('singleMenu', menuId);
  });
});

// rendered
Template.MenuDelete.rendered = function(){
  var menuId = Session.get('MenuId');
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Deleted Menu ' + menuId
  });

  $('body').scrollTop(0);
};

// helpers
Template.MenuDelete.helpers({
  menuItem: function() {
    var menuId = Session.get('MenuId');
    return Menu.findOne({_id: menuId});
  }
});
