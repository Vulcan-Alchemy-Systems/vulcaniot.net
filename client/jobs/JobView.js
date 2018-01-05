Template.JobView.onCreated(function() {
  this.autorun(() => {
    var jobId = Session.get('JobId');
    var customerId = Session.get('customerId');
    this.subscribe('singleCustomer', customerId);
    this.subscribe('singleJob', jobId);
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

});
