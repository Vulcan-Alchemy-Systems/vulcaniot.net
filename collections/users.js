import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

SimpleSchema.extendOptions(['autoform']);

Meteor.users.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});

RolesSchema = new SimpleSchema({
  roles: {
    type: String,
    optional: false,
    autoform: {
      type: "select",
      options: [
        {
          label: "admin",
          value: "admin"
        },
        {
          label: "customer",
          value: "customer"
        },
        {
          label: "employee",
          value: "employee"
        },
      ]
    }
  }

});

PhonesSchema = new SimpleSchema({
  // number
  number: {
    type: String,
    label: "Number"
  },
  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Primary Phone",
          value: "Primary Phone"
        },
        {
          label: "Mobile Phone",
          value: "Mobile Phone"
        },
        {
          label: "Other Phone",
          value: "Other Phone"
        },
        {
          label: "Fax",
          value: "Fax"
        },
      ],
      afFieldInput: {
        firstOption: "(Select a Type)"
      }
    }
  },
});

AddressSchema = new SimpleSchema({
  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Billing Address",
          value: "Billing Address"
        },
        {
          label: "Shipping Address",
          value: "Shipping Address"
        },
        {
          label: "Other Address",
          value: "Other Address"
        },
      ],
      afFieldInput: {
        firstOption: "(Select a Type)"
      }
    }
  },
  // street
  street: {
    type: String,
    label: "Street"
  },
  // streetCont
  streetCont: {
    type: String,
    label: "Street Cont.",
    optional: true,
  },
  // city
  city: {
    type: String,
    label: "City"
  },
  // state
  state: {
    type: String,
    label: "State",
    allowedValues: ["Oregon", "Washington", "California", "Colorado"],
    autoform: {
      afFieldInput: {
        firstOption: "(Select a State)"
      }
    }
  },
  // postal
  postal: {
    type: String,
    label: "Postal"
  },
});

UserProfileSchema = new SimpleSchema({
  // name
  name: {
    type: String,
    label: "Name",
    optional: false,
  },
  // status
  status: {
    type: String,
    label: "Status",
    autoform: {
      type: "select",
      options: [
        {
          label: "Active",
          value: "Active"
        },
        {
          label: "Suspended",
          value: "Suspended"
        },
        {
          label: "Deleted",
          value: "Deleted"
        },
      ],
      afFieldInput: {
        firstOption: "(Select a Status)"
      }
    }
  },
  // created
  createdAt: {
    type: Date,
    label: "Created",
    optional: true,
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  },
  // position
  position: {
    type: String,
    label: "Position",
    optional: true,
  },
  // image
  image: {
    type: String,
    label: "Image",
    optional: true,
  },
  // website
  website: {
    type: String,
    label: "Website",
    optional: true,
  },
  // gender
  gender: {
    optional: true,
    type: String,
    label: "Gender",
    autoform: {
      type: "select",
      options: [
        {
          label: "Male",
          value: "Male"
        },
        {
          label: "Female",
          value: "Female"
        },
      ],
      afFieldInput: {
        firstOption: "(Select a Gender)"
      }
    }
  },
  // birthday
  birthday: {
    type: Date,
    label: "Birthday",
    optional: true,
  },
  // clockedIn
  clockedIn: {
    type: Boolean,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  // vendorId
  vendorId: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  // vendorName
  vendorName: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  // customerId
  customerId: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  // customerName
  customerName: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  // address
  address: {
    type: Array,
    optional: true,
  },
  'address.$': AddressSchema,
  // phones
  phones: {
    type: Array,
    optional: true,
  },
  'phones.$': PhonesSchema,
});

EmailSchema = new SimpleSchema({
  // address
  address: {
    type: String,
    label: "E-Mail",
    optional: false,
  },
  // verified
  verified: {
    type: Boolean,
    label: "Verified",
    optional: false,
    autoValue: function () {
      return true;
    },
    autoform: {
      type: "hidden",
    }
  },
});

UserSchema = new SimpleSchema({
    profile: {
        type: UserProfileSchema,
        optional: false
    },
    emails: {
      type: Array,
      optional: false
    },
    'emails.$': EmailSchema,
    roles: {
        type: Array,
        optional: true,
        blackbox: true,
    },
    'roles.$': RolesSchema,
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
});

Meteor.users.attachSchema(UserSchema);

// methods
Meteor.methods({
  addUserToRole: function(user, role) {
    return Roles.addUsersToRoles(user, role);
  },

  // remove role
  removeUserRole: function(user, role) {
    return Roles.removeUsersFromRoles(user, role);
  },

  // toggle user status
  usersToggleStatus: function(id, status){
    Meteor.users.update({_id: id}, {$set: {"profile.status": status}});
  },

  // create user
  usersCreate:function(user) {
    var userId = Meteor.users.insert(user);
    return userId;
  },

  // vendor user
  userVendorCreate: function(user) {
    var userId = Meteor.users.insert(user);
    Roles.addUsersToRoles(userId, 'vendor');
    Roles.addUsersToRoles(userId, 'messages');
    return userId;
  },

  // customer user
  userCustomerCreate: function(user) {
    var userId = Meteor.users.insert(user);
    Roles.addUsersToRoles(userId, 'customer');
    Roles.addUsersToRoles(userId, 'messages');
    return userId;
  },

  // employee create
  employeeCreate: function(user) {
    var userId = Meteor.users.insert(user);
    Roles.addUsersToRoles(userId, 'notices');
    Roles.addUsersToRoles(userId, 'messages');
    Roles.addUsersToRoles(userId, 'tasks');
    Roles.addUsersToRoles(userId, 'timeclock');
    Roles.addUsersToRoles(userId, 'employee');
  },
  // reset users password
  userResetPassword: function(userId, password) {
    if (Meteor.isServer) {
      return Accounts.setPassword(userId, password);
    }
  },
  // fetch users
  userFetch: function() {
    return Meteor.users.find({});
  },
  // user count
  userCount: function() {
    return Meteor.users.find({}).count();
  },

  // delete user
  deleteUser: function(options) {
    // options should include: id
    options = options || {};

    if (! (typeof options.id === "string")) {
      throw new Meteor.Error(400, "Required parameter missing");
    }

    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    var user = Meteor.users.findOne({ _id: options.id });
    if (user == null) {
      throw new Meteor.Error(402, "User not found");
    }

    Meteor.users.remove({ _id: options.id });
  },

  // update user
  updateUser: function(id, doc) {
    Meteor.users.update({_id: id}, doc);
  },
});
