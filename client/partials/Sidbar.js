Template.Sidebar.rendered = function(){
  Meteor.setInterval(function () {
    // events.count
    Meteor.call(
      "events.count",
      ...arguments,
      function (error, result) {
        Session.set('eventCount', result);
      }
    );
    // events.count.error
    Meteor.call(
      "events.count.error",
      ...arguments,
      function (error, result) {
        Session.set('eventCountError', result);
      }
    );
    // events.count.warning
    Meteor.call(
      "events.count.warning",
      ...arguments,
      function (error, result) {
        Session.set('eventCountWarning', result);
      }
    );
    // events.count.ok
    Meteor.call(
      "events.count.ok",
      ...arguments,
      function (error, result) {
        Session.set('eventCountOk', result);
      }
    );
    // notices.count
    Meteor.call(
      "notices.count",
      ...arguments,
      function (error, result) {
        Session.set('noticesCount', result);
      }
    );
  },5000);
};

Template.Sidebar.helpers({
  fullName: function() {
    return Meteor.user().profile.name;
  },
  profileImage: function() {
    return Meteor.user().profile.image;
  },
  eventsCount: function() {
    return Session.get('eventCount');
  },
  eventsCountError: function() {
    return Session.get('eventCountError');
  },
  eventsCountWarning: function() {
    return Session.get('eventCountWarning');
  },
  eventsCountOk: function() {
    return Session.get('eventCountOk');
  },
  noticesCount: function() {
    return Session.get('noticesCount');
  },
  userEnabled: function() {
    if(Meteor.settings.public.features.user) {
      return true;
    } else {
      return false;
    }
  },
  searchEnabled: function() {
    if(Meteor.settings.public.features.search) {
      return true;
    } else {
      return false;
    }
  },
  displayUserStatusEnabled: function() {
    if(Meteor.settings.public.features.displayUserStatus) {
      return true;
    } else {
      return false;
    }
  },
  demoMenuDisabled: function() {
    if(Meteor.settings.public.features.demoMenu) {
      return false;
    } else {
      return true;
    }
  }
});
