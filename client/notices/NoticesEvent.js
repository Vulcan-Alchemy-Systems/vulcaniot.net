Template.NoticesEvent.onCreated(function() {
  var self = this;

  // subscribe
  self.autorun(function() {
    self.subscribe("notices");
  });
});

// helpers
Template.NoticesEvent.helpers({
  noticesList: function(event) {
    console.log(event.hash.event);
    return Notices.find({event:event.hash.event}, {sort: {created: -1}, limit: 5});
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
