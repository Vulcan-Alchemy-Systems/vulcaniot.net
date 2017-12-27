Template.InventoryCategoryList.onCreated(function() {
  this.autorun(() => {
    var page = FlowRouter.getParam('page');
    var currentPage = parseInt(page) || 1;
    var skipCount = (currentPage - 1) * Meteor.settings.public.recordsPerPage;
    this.subscribe('allInventoryCategory', skipCount);
    Session.set("search-query", "");
  });
});

// rendered
Template.InventoryCategoryList.rendered = function(){
  Meteor.call('createHistory', {
    userId: Meteor.userId(),
    message: 'Viewed Inventory Category List'
  });
}

// helpers
Template.InventoryCategoryList.helpers({
  // get
  inventoryCaregory: function() {
    var keyword  = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    var results =  InventoryCategory.find( { $or: [{'name': query}]} );
    return results;
  },
  inventoryCategoryData: function() {
    return Session.get('InventoryCategoryData');
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  },
  // pagination stuff
  prevPage: function() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    var pathDef = "/admin/inventory-category/:page";
    var params = {page: previousPage};
    var path = FlowRouter.path(pathDef, params);
    return path;;
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    var pathDef = "/admin/inventory-category/:page";
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
Template.InventoryCategoryList.events({
  // category
  'click .new-inventory-category': function(event) {
    event.preventDefault();
    Session.set('InventoryCategoryNew', ! Session.get('InventoryCategoryNew'));
  },
  // delete modal
  'click .inventory-category-delete': function(event) {
    event.preventDefault();
    Session.set('deleteId', this._id);
    $('#deleteName').html(this.name);
    $('#deleteModal').modal('toggle');
  },
  // update modal
  'click .inventory-category-update': function(event) {
    event.preventDefault();
    Session.set('InventoryCategoryData', this);
      $('#updateModal').modal('toggle');
  },
  'click .do-update-inventory-category': function(event) {
    event.preventDefault();
    var data = Session.get('InventoryCategoryData');

    // get data from form
    var formData = AutoForm.getFormValues('updateInventoryCategoryForm');

    // call update
    Meteor.call('updateInventoryCategory',
      data._id, formData.updateDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Inventory Category was saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'updated inventory category ' + data._id
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // reset session
          Session.set('InventoryCategoryData', false);

          // toggle modal
          $('#updateModal').modal('toggle');

          // scrollTop
          $('body').scrollTop(0);
        }
      }
    );
  },
  // do delete
  'click .do-delete-inventory-category': function(event) {
    event.preventDefault();
    var id = Session.get('deleteId');

    // call remove
    Meteor.call('deleteInventoryCategory',
      id,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
          $('#deleteModal').modal('toggle');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Inventory Category was deleted.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'removed inventory category ' + id
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // toggle modal
          $('#deleteModal').modal('toggle');

          // scrollTop
          $('body').scrollTop(0);
        }
      }
    );
  },
  // pagination
  'click #prevPage': function(event) {
      $('body').scrollTop(0);
  },
  'click #nextPage': function(event) {
    $('body').scrollTop(0);
  },
  // search
  'keyup .inventory-category-search': function(event) {
    Session.set("search-query", event.currentTarget.value);
  }
});

// routes
FlowRouter.route('/admin/inventory-category/:page', {
  name: 'inventoryCategoryListPage',
  parent: 'admin',
  title: 'Inventory category',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'InventoryCategoryList'});
  },
});

FlowRouter.route('/admin/inventory-category', {
  name: 'inventoryCategoryList',
  parent: 'admin',
  title: 'Inventory category',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'InventoryCategoryList'});
  },
});

var hasMorePages = function() {
  var totalLocations = Counts.get('locationsCount');
  return currentPage() * parseInt(10) < totalLocations;
}

var currentPage = function() {
  var page = FlowRouter.getParam('page');
  return parseInt(page) || 1;
}
