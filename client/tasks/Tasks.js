// on created
Template.Tasks.onCreated(function() {
  var self = this;

  // if not enabled go back to dashboard
  if(!Meteor.settings.public.features.tasks) {
    FlowRouter.go("dashboard");
  }

  // subscribe
  self.autorun(function() {
    self.subscribe("tasks");
  });
    // edit mode
    this.editMode = new ReactiveVar(false);
});

// helpers
Template.Tasks.helpers({
  // tasks lists
  taskList: function() {
    return Tasks.find({author: Meteor.userId()});
  },

  // taskDetail
  taskDetail: function() {
    var taskId = Session.get('taskId');
    return false;
  },

  // date format
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },

  // is Task Completed adds checked prop to checkboxs
  isTaskCompleted: function() {
    if(this.completed) {
      return "checked";
    } else {
      return "";
    }
  }
});

// events
Template.Tasks.events({
  // new clicked
  'click .new-task': function() {
    Session.set('newTask', true);
  },

  // submited
  'submit': function() {
    Session.set('newTask', false);
  },

  // cancel
  'click .cancel-new-task': function() {
    Session.set('newTask', false);
  },

  // complete
  'click .task-completed': function() {
    Meteor.call('toggleTaskCompleted', this._id, this.completed);
  },

  // view
  'click .task-detail': function() {
    Session.set('viewTask', true);
    Session.set('editTask', false);
    Session.set('taskId', this._id);
  }
});

// router
FlowRouter.route('/profile/tasks', {
  name: 'tasks',
  parent: 'profile',
  title: 'Tasks',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'Tasks'});
  },
});
