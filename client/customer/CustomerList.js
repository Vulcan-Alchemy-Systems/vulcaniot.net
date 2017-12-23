
Template.CustomerList.onCreated(function() {
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

// helpers
Template.CustomerList.helpers({
  customers: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  Customers.find( { $or: [{'name': query}]} );
    return results;
  },
  searchQuery: function() {
    return Session.get("search-query");
  },
  isCustomerActive: function(status) {
    if(status == 'Active') {
      return 'bg-aqua-active';
    } else {
      return 'bg-red';
    }
  },
  customerStatus: function(status) {
    if(status) {
        return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    } else {
      return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    }
  },
  primaryPhone: function(phones) {
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
  },
  primaryEmail: function(emails) {
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
  // new location
  'click .new-customer': function(event) {
    Session.set('NewCustomer', !Session.get('NewCustomer'));
  },
  'click #prevPage': function(event) {
      $('body').scrollTop(0);
  },
  'click #nextPage': function(event) {
    $('body').scrollTop(0);
  },
  'keyup .customer-search': function(event) {
    Session.set("search-query", event.currentTarget.value);
  }
});

// router
FlowRouter.route('/customers/:page', {
  name: 'customerListPage',
  parent: 'dashboard',
  title: 'Customers',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'CustomerList'});
  },
});

// route
FlowRouter.route('/customers', {
  name: 'customerList',
  parent: 'dashboard',
  title: 'Customers',
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
