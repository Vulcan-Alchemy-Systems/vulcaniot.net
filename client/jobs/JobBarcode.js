Template.JobBarcode.rendered = function() {
  //window.print();
};

// helpers
Template.JobBarcode.helpers({
  // creates random bar codes
  getBarCodes: function() {
    barCodes = [];
    count = 100;

    for (let i = 0; i < count; i++) {
      barCodes.push({
        barCode: Math.random().toString(36).substr(2, 9)
      })
    }

    return barCodes;
  }
});

// route
FlowRouter.route('/print-bar-code', {
  name: 'printBarCode',
  parent: 'dashboard',
  title: 'Print Bar Code',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      //FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('PrintLayout', {
      main: 'JobBarcode'
    });
  },
});
