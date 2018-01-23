Template.JobView.onCreated(function() {
  this.autorun(() => {
    var jobId = Session.get('JobId');
    var customerId = Session.get('customerId');
    this.subscribe('singleCustomer', customerId);
    this.subscribe('singleJob', jobId);
    this.subscribe('files.images.all');
  });
});

// helpers
Template.JobView.helpers({
  job: function() {
    var jobId = Session.get('JobId');
    var job = Jobs.findOne({_id: jobId});
    Session.set('Job', job);
    return job;
  },
  customer: function() {
    var customerId = Session.get('customerId');
    return Customers.findOne({_id: customerId});
  },
  longDateFormat: function(dateTime) {
    return moment(dateTime).format(Meteor.settings.public.longDate);
  },
  externalReporting: function(externalReporting) {
    if(externalReporting == true) {
      return "Yes";
    } else {
      return "No";
    }
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
      var number = false;
      phones.forEach(function(phone) {
        if(phone.type == 'Primary') {
           number = phone.number;
        }
      });
      if(number) {
        return '<a href="tel:'+number+'" title="Call" style="color:white">' + number + '</a>';
      }
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
  }
});

// events
Template.JobView.events({
  // new note
  'click .job-note-new': function(event) {
    event.preventDefault();
    Session.set('JobNoteNew', !Session.get('JobNoteNew'));
  },

  // edit note
  'click .job-note-edit': function(event) {
    event.preventDefault();
    Session.set('JobNoteEdit', !Session.get('JobNoteEdit'));
    Session.set('JobNote', this);
  },

  // delete notes
  'click .job-note-delete': function(event) {
    event.preventDefault();
    Session.set('JobNoteDelete', !Session.get('JobNoteDelete'));
    Session.set('JobNote', this);
  },

  // new product
  'click .job-product-new': function(event) {
    event.preventDefault();
    Session.set('JobProductNew', !Session.get('JobProductNew'));
  },

  // job-product-image
  'click .job-product-image': function(event) {
    event.preventDefault();
    $('#jobProductImage').attr('src', this.image);
    $('#myModal').modal('toggle')
  },

  // job-product-delete
  'click .job-product-delete': function(event) {
    event.preventDefault();
    Session.set('JobProductDelete', !Session.get('JobProductDelete'));
    Session.set('JobProduct', this);
  },

  // job-transfer-new
  'click .job-transfer-new': function(event) {
    event.preventDefault();
    Session.set('JobTransferNew', !Session.get('JobTransferNew'));
  },

  // job-transfer-edit
  'click .job-transfer-edit': function(event) {
    event.preventDefault();
    Session.set('JobTransferEdit', !Session.get('JobTransferEdit'));
    Session.set('JobTransfer', this);
  },

  // job-transfer-edit
  'click .job-transfer-delete': function(event) {
    event.preventDefault();
    Session.set('JobTransferDelete', !Session.get('JobTransferDelete'));
    Session.set('JobTransfer', this);
  }
});
