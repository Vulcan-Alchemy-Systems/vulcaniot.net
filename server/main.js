import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
  // menus
  if (Menu.find().count() === 0) {
    JSON.parse(Assets.getText("Menu.json")).menu.forEach(function(doc) {
      Menu.insert(doc);
    });
  }

  // Roles
  if (Roles.getAllRoles().count() === 0) {
    JSON.parse(Assets.getText("Roles.json")).roles.forEach(function(doc) {
      Roles.createRole(doc.name);
    });
  }
});
