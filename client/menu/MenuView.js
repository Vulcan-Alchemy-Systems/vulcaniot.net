// on Created
Template.MenuView.onCreated(function() {
  // auto run
  this.autorun(() => {
    var menuId = Session.get('MenuId');

    // subscribe
    this.subscribe('singleMenu', menuId);
  });
});

// rendered
Template.MenuView.rendered = function(){
  var menuId = Session.get('MenuId');
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Menu ' + menuId
  });

  $('body').scrollTop(0);
};

// helpers
Template.MenuView.helpers({
  menuItem: function() {
    var menuId = Session.get('MenuId');
    return Menu.findOne({_id: menuId});
  }
});
