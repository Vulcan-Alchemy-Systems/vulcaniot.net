import Chart from 'chart.js';
// created
Template.DashboardEmployee.onCreated(function() {
  this.autorun(() => {
    this.subscribe('gasEvent', '/vulcan/scale/gas', 1);
  });
});

// rendered
Template.DashboardEmployee.rendered = function() {
  Meteor.setInterval(function() {
    var entity = Events.find({
      topic: '/vulcan/scale/gas'
    }, {
      limit: 60,
      sort: {
        created: -1
      }
    }).fetch();

    // get chart default settings
    var options = Meteor.settings.public.chartJs;
    var ctx = document.getElementById("myChart").getContext("2d");

    // labels
    var labels = entity.map(function(doc) {
      return doc.created;
    });

    for (var i in labels) {
      var date = moment(labels[i]).format("HH:mm:ss");
      labels[i] = date;
    }

    // get values into an array
    var data = entity.map(function (doc) {
      console.log(doc.gas);
      return doc.gas;
    });

    var chartData = {
      labels  : labels.reverse(),
      datasets: [
        {
          label: 'Gas',
          data: data.reverse()
        },
      ]
    }

    // set chart data
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: options
    });


    console.log(data);
  }, 2000);


};



// helpers
Template.DashboardEmployee.helpers({
  // is clocked in
  isClockedIn: function() {
    userEntity = Meteor.user();
    if (userEntity.profile.clockedIn) {
      return true;
    } else {
      return false;
    }
  },
});

// events
Template.DashboardEmployee.events({
  // clock user in
  'click .clock-user-in-btn': function(event) {
    event.preventDefault();
    var userId = Meteor.userId();
    var created = Date();

    Meteor.call(
      "clockUserIn",
      userId, created,
      function(error, result) {
        if (error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>You have been clocked in</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'User Clocked In'
          });
        }
      }
    );

    // auto dismiss
    $("#alert").fadeTo(2000, 500).slideUp(500, function() {
      $("#alert").slideUp(500);
    });
  },

  // clock user out
  'click .clock-user-out-btn': function(event) {
    event.preventDefault();
    var created = Date();
    var userId = Meteor.userId();

    Meteor.call(
      "clockUserOut",
      userId, created,
      function(error, result) {
        if (error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>You have been clocked out</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'User Clocked Out'
          });
        }
      }
    );

    // auto dismiss
    $("#alert").fadeTo(2000, 500).slideUp(500, function() {
      $("#alert").slideUp(500);
    });
  },
});
