Template.NoticeView.onCreated(function() {
  var self = this;

  // subscribe
  self.autorun(function() {
    self.subscribe("notice");
  });
});

Template.NoticeView.rendered = function(){
  var id = FlowRouter.getParam('id');
  Meteor.setInterval(function () {
    Meteor.call(
      "notices.count",
      ...arguments,
      function (error, result) {
        Session.set('noticesCount', result);
      }
    );
  },1000);

  // mark read
  Meteor.call(
    "notices.markRead",
     id,
    function(error, result) {}
  );
};

Template.NoticeView.helpers({
  noticesCount: function() {
    return Session.get('noticesCount');
  },
  notice: function() {
    var id = FlowRouter.getParam('id');
    return Notices.findOne({_id: id});
  },
  dateFormat: function(date) {
    return moment(date).format(Meteor.settings.public.longDate);
  },

});

// router
FlowRouter.route('/notices/:id', {
  name: 'noticesView',
  parent: 'notices',
  title: 'View Notice',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'NoticeView'});
  },
});
