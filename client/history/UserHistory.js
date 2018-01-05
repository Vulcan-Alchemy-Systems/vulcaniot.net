// created
Template.UserHistory.onCreated(function() {
    this.autorun(() => {
      var page = FlowRouter.getParam('page');
      var currentPage = parseInt(page) || 1;
      var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
      var id = FlowRouter.getParam('id');
      this.subscribe('userHistory',id, skipCount);
    });
});

// rendered
Template.UserHistory.rendered = function(){
};

// helpers
Template.UserHistory.helpers({
  getUserHistory: function() {
    var id = FlowRouter.getParam('id');
    return History.find({userId: id},  {"sort" : [['created', 'desc']]} ).fetch();
  },
});
