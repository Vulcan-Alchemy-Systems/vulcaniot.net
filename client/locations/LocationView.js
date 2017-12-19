// created
Template.LocationView.onCreated(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('id');
    this.subscribe('singleLocation', id);
    var result =  Locations.findOne({_id: id});
    Session.set('locationData', result);
  });
});

// rendered
Template.LocationView.rendered = function(){
  var location = Session.get('locationData');
  if(location) {
    Meteor.call('createHistory', {
      userId: Meteor.userId(),
      message: 'Viewed Location ' + location.name
    });
  }
};

// helpers
Template.LocationView.helpers({
  location: function() {
    return Session.get('locationData');
  },
  isLocationActive: function(status) {
    if(status == 'Active') {
      return 'bg-aqua-active';
    } else {
      return 'bg-red';
    }
  },
  locationStatus: function(status) {
    if(status == 'Active') {
        return '<span class="pull-right badge bg-green">'+status+'</span></a>';
    } else {
      return '<span class="pull-right badge bg-red">'+status+'</span></a>';
    }
  },
  roomCount: function(rooms) {
    if(rooms) {
      return rooms.length;
    } else {
      return 0;
    }
  },
  licenseCount: function(license) {
    if(length) {
      return license.length;
    } else {
      return 0;
    }
  },
  dateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.shortDate);
  }
});

// events
Template.LocationView.events({
  'click .edit-location': function(event) {
    Session.set('EditLocation', !Session.get('EditLocation'));
  },
  'click .delete-location': function(event) {
    $('#deleteModal').modal('toggle');
  },
  'click .do-delete-location': function(event) {
    var location = Session.get('locationData');

    // call update
    Meteor.call('removeLocation',
      location._id,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          // hide modal
          $('#deleteModal').modal('hide');

          // mark history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Deleted Location ' + location.name
          });

          // clear session data
          Session.set('locationData', null);

          // on hide redirect
          $('#deleteModal').on('hidden.bs.modal', function (event) {
            FlowRouter.go('locations');
          });

        }
      }
    );
  }
});

// router
FlowRouter.route('/locations/:id/view', {
  name: 'locationsView',
  parent: 'locationsList',
  title: 'View',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'LocationView'});
  },
});
