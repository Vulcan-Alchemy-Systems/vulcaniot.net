Template.JobProductNew.helpers({
  job: function() {
    return Session.get('Job');
  }
});

// events
Template.JobProductNew.events({
  'click .job-product-new-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('updateJobForm').updateDoc;
    var job = Session.get('Job');

    console.log(formData);
  },
  'click .takePhoto': function(e, instance) {
        e.preventDefault();
        var cameraOptions = {
            width: 800,
            height: 600
        };
        
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
           if (!error) {
               instance.$('.photo').attr('src', data);
               console.log(data);
           }
        });
    }
});
