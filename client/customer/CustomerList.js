
Template.CustomerList.onCreated(function() {
  Session.set('redirectAfterLogin', 'customerList');
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allCustomers', skipCount);
    Session.set("search-query", "");
  });
});

// rendered
Template.CustomerList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Customer List'
  });

  $('body').scrollTop(0);
};

// customerIsActive
Template.registerHelper( 'customerIsActive', ( customerStatus ) => {
  if(customerStatus == 'Active') {
    return 'bg-aqua-active';
  } else {
    return 'bg-red';
  }
});

// customerStatus
Template.registerHelper( 'customerStatus', ( customerStatus ) => {
  if(customerStatus == 'Active') {
      return '<span class="pull-right badge bg-green">'+customerStatus+'</span></a>';
  } else {
    return '<span class="pull-right badge bg-green">'+customerStatus+'</span></a>';
  }
});

// customerPrimaryPhone
Template.registerHelper( 'customerPrimaryPhone', ( phones ) => {
  if(phones) {
    var number = null;
    phones.forEach(function(phone) {
      if(phone.type == 'Primary') {
         number = phone.number;
      }
    });

    if(number) {
      return '<a href="tel:'+number+'" title="Call" style="color:white">' + number + '</a>';
    }
  } else {
    return 'No Phone Number';
  }
});

// customerPrimaryEmail
Template.registerHelper( 'customerPrimaryEmail', ( emails ) => {
  if(emails) {
    var address = false;
    emails.forEach(function(email) {
      if(email.type == 'Primary') {
         address = email.address;
      }
    });
    if(address) {
      return '<a href="mailto:'+address+'" title="Email" style="color:white">' + address + '</a>'
    }
  }
});


// helpers
Template.CustomerList.helpers({
  customers: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Customers.find( { $or: [{'name': query}]} );
    return results;
  },

  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/customers/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },

  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/customers/:page";
    var params = {page: nextPage};
    var path = FlowRouter.path(pathDef, params);
    return path;
  },

  prevPageClass: function() {
    return currentPage() <= 1 ? "disabled" : "";
  },

  nextPageClass: function() {
    return hasMorePages() ? "" : "disabled";
  }
});

// events
Template.CustomerList.events({
  // customer-new
  'click .customer-new': function(event) {
    event.preventDefault();
    Session.set('CustomerNew', !Session.get('CustomerNew'));
  },

  // customer-view
  'click .customer-view': function(event) {
    event.preventDefault();
    Session.set('CustomerId', this._id);
    Session.set('CustomerView', !Session.get('CustomerView'));
  },

  // customer edit
  'click .customer-edit': function(event) {
    event.preventDefault();
    Session.set('CustomerEdit', !Session.get('CustomerEdit'));
  },

  // prevPage
  'click #prevPage': function(event) {
    event.preventDefault();
      $('body').scrollTop(0);
  },

  // nextPage
  'click #nextPage': function(event) {
    event.preventDefault();
    $('body').scrollTop(0);
  },

  // customer-search
  'keyup .customer-search': function(event) {
    event.preventDefault();
    Session.set("search-query", event.currentTarget.value);
  }
});

// router
FlowRouter.route('/customers/:page', {
  name: 'customerListPage',
  parent: 'dashboard',
  title: 'Customers',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CustomerList'});
  },
});

// route
FlowRouter.route('/customers', {
  name: 'customerList',
  parent: 'dashboard',
  title: 'Customers',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), ['employee'])) {
      FlowRouter.go('signIn');
    }
  }],
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CustomerList'});
  },
});

var hasMorePages = function() {
  var totalCustomers = Counts.get('customerCount');
  return currentPage() * parseInt(10) < totalCustomers;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
