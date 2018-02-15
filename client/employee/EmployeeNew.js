
// helpers
Template.EmployeeNew.helpers({

});

// events
Template.EmployeeNew.events({
  // submit new user form
  'click .employee-new-submit': function(event) {
    event.preventDefault();

    // get form data
    var formData = AutoForm.getFormValues('insertUserForm').insertDoc;

    // call update
    Meteor.call('employeeCreate',
      formData,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Employee has been created.</div>');

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          // reset session
          Session.set('EmployeeNew', false);
        }
      }
    );
  }

});

// router
FlowRouter.route('/employees/new', {
  name: 'employeeNew',
  parent: 'employeeList',
  title: 'Create',
  action: function() {
    BlazeLayout.render('MainLayout', {main: 'EmployeeNew'});
  },
});
