import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
  // menus
  if (Menu.find().count() === 0) {
    JSON.parse(Assets.getText("menu.json")).menu.forEach(function(doc) {
      Menu.insert(doc);
    });
  }

  // Roles
  if (Roles.getAllRoles().count() === 0) {
    JSON.parse(Assets.getText("roles.json")).roles.forEach(function(doc) {
      Roles.createRole(doc.name);
    });
  }

  // jobsStatus
  if (JobsStatus.find().count() === 0) {
    JSON.parse(Assets.getText("jobsStatus.json")).jobsStatus.forEach(function(doc) {
      JobsStatus.insert(doc);
    });
  }

  // deviceType
  if (DeviceType.find().count() === 0) {
    JSON.parse(Assets.getText("seviceType.json")).deviceType.forEach(function(doc) {
      DeviceType.insert(doc);
    });
  }
});
