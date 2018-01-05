import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Menu = new Meteor.Collection("menu");

// rules
Menu.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

// schemas
ApplicationSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name",
    autoform: {
      type: "select",
      options: [
        {
          label: "VulcanAlchemy.biz",
          value: "VulcanAlchemy.biz"
        },
        {
          label: "VulcanAlchemyOnline.com",
          value: "VulcanAlchemyOnline.com"
        },
        {
          label: "VulcanAlchemy.org",
          value: "VulcanAlchemy.org"
        },
        {
          label: "VulcanIOT.com",
          value: "VulcanIOT.com"
        },
        {
          label: "VulcanIOT.net",
          value: "VulcanIOT.net"
        },
        {
          label: "VulcanMedical.org",
          value: "VulcanMedical.org"
        },
      ]
    }
  },
});

// subMenu
SubMenuSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name"
  },

  // icon
  icon: {
    type: String,
    label: "Icon"
  },

  // url
  url: {
    type: String,
    label: "Link"
  },

  // order
  order: {
    type: String,
    label: "Order"
  },

  // active
  active: {
    type: Boolean,
    label: "Active",
  },
});

// menu
MenuSchema = new SimpleSchema({
  // application
  application: {
    type: Array,
  },
  'application.$': ApplicationSchema,

  // name
  name: {
    type: String,
    label: "Name"
  },

  // icon
  icon: {
    type: String,
    label: "Icon"
  },

  // active
  active: {
    type: Boolean,
    label: "Active",
  },

  // order
  order: {
    type: String,
    label: "Order"
  },

  subMenu: {
    type: Array,
  },
  'subMenu.$': SubMenuSchema,

  // created
  created: {
    type: Date,
    label: "Created",
    autoform: {
      type: "hidden",
    }
  },

  // lastModified
  lastModified: {
    type: Date,
    label: "Last Modified",
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  },
});

// attach
Menu.attachSchema(MenuSchema);

// methods
Meteor.methods({
  // create
  menuCreate: function(menuEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Menu.insert(menuEntity);
  },

  // update
  menuUpdate: function(menuId, menuEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Menu.update({_id: menuId}, menuEntity);
  },

  // delete
  menuDelete: function(menuId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    Menu.remove({_id: menuId});
  }
});
