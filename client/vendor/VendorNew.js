// events
Template.VendorNew.events({
  'click .new-vendor-submit': function(event) {
    event.preventDefault();
    var formData = AutoForm.getFormValues('insertVendorForm');

    // call update
    Meteor.call('createVendor',
      formData.insertDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Vendor has been saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Created vendor '
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          $('body').scrollTop(0);

          // set edit to false
          Session.set('NewVendor', !Session.get('NewVendor'));
        }
      }
    );
  },
});
