import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Category = new Meteor.Collection("category");

// rules
Category.allow({
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

//schemas
MetaKeywordSchema = new SimpleSchema({
  // keyword
  keyword: {
    type: String,
    label: "Keyword"
  },
});

SubCategorySchema = new SimpleSchema({
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
});

ApplicationSchema = new SimpleSchema({
  //
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

CategorySchema = new SimpleSchema({
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

  // description
  description: {
    type: String,
    label: "Description",
    autoform: {
      type: "textarea",
    }
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

  // type
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select",
      options: [
        {
          label: "Product",
          value: "Product"
        },
      ]
    }
  },

  // metaTitle
  metaTitle: {
    type: String,
    label: "Meta Title"
  },

  // metaDescription
  metaDescription: {
    type: String,
    label: "Meta Description",
    autoform: {
      type: "textarea",
    }
  },

  // metaKeywords
  metaKeywords: {
    type: Array,
  },
  'metaKeywords.$': MetaKeywordSchema,

  // subCategory
  subCategory: {
    type: Array,
  },
  'subCategory.$': SubCategorySchema,

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
Category.attachSchema(CategorySchema);

// methods
Meteor.methods({
  // create
  categoryCreate: function(categoryEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Category.insert(categoryEntity);
  },

  // update
  categoryUpdate: function(categoryId, categoryEntity) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    return Category.update({_id: categoryId}, categoryEntity);
  },

  // delete
  categoryDelete: function(categoryId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "You must be logged in");
    }

    Category.remove({_id: categoryId});
  }
});
