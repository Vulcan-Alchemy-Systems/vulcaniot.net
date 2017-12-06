Template.NoticesList.onCreated(function() {
  var self = this;

  // subscribe
  self.autorun(function() {
    self.subscribe("notice");
  });
});

// render
Template.NoticesList.rendered = function(){
  Meteor.setInterval(function () {
    Meteor.call(
      "notices.count",
      ...arguments,
      function (error, result) {
        Session.set('noticesCount', result);
      }
    );
  },1000);
};

// events
Template.NoticesList.events({
  "click .toggle-star": function(event, template){
      Meteor.call('toggle.notice.star', this._id, this.star);
  },

});

// helpers
Template.NoticesList.helpers({
  noticesCount: function() {
    return Session.get('noticesCount');
  },
  noticesList: function() {
    return Notices.find({},{sort: {created: -1}, limit: 25});
  },
  dateFormat: function(date) {
    return moment(date).format(Meteor.settings.public.longDate);
  },
  isRead: function(read) {
    if(! read) {
      return "font-weight: bold";
    } else {
      return "";
    }
  },
  isStar: function(star) {
    if(! star) {
      return "fa-star-o";
    } else {
      return "fa-star text-yellow";
    }
  }
});

// router
FlowRouter.route('/profile/notices', {
  name: 'notices',
  parent: 'profile',
  title: 'Notices',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'NoticesList'});
  },
});
