Template.TimePrint.onCreated(function() {
  this.autorun(() => {
    var userId = FlowRouter.getParam('userId');
    this.subscribe('singleUser', userId);
    this.subscribe('singleUserTime',userId);
  });
});


// helpers
Template.TimePrint.helpers({
  times: function() {
    var startDate = FlowRouter.getQueryParam('startDate');
    var endDate = FlowRouter.getQueryParam('endDate');
    var userId = FlowRouter.getParam('userId');

    Meteor.call('timeSearchDate', startDate, endDate, userId, function(error, result) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
          console.log(result);
          Session.set('UserTimes', result);
          $('#timeSearchModal').modal('toggle');
      }
    });

    return Session.get('UserTimes');
  },

  user: function() {
      var userId = FlowRouter.getParam('userId');
      var result = Meteor.users.findOne({_id: userId});
      console.log(result);
      return result;
  },
  address: function(address) {
    return address[0];
  },
  // street address
  streetAddress: function(address) {
    var address = address[0];
    return address.street;
  },
  // city
  city: function(address) {
    var address = address[0];
    return address.city;
  },
  state: function(address) {
    var address = address[0];
    return address.state;
  },
  postal: function(address) {
    var address = address[0];
    return address.postal;
  },
  phone: function(phones) {
    var phone = phones[0];
    return phone.number;
  },
  date: function() {
    return moment(new Date()).format("MMM Do YY"); ;
  }
});

// route
FlowRouter.route('/admin/users/:userId/time/print', {
  name: 'timePrint',
  parent: 'dashboard',
  title: 'Print',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      //FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('PrintLayout', {main: 'TimePrint'});
  },
});
