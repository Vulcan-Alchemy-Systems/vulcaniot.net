Template.ProfileTime.onCreated(function() {
  this.autorun(() => {
    Session.set('UserId', Meteor.userId());
    console.log(Meteor.userId());
  });
});

// routes
FlowRouter.route('/profile/time-clock', {
  name: 'profileTimeClock',
  parent: 'profile',
  title: 'Time Clock',
  triggersEnter: [function(context, redirect) {
    if (! Meteor.userId()) {
      redirect('/sign-in');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'ProfileTime'});
  },
});
