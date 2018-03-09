import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

SimpleSchema.setDefaultMessages({
  initialLanguage: 'en',
  messages: {
    en: {
      uploadError: '{{value}}', //File-upload
    },
  }
});

Products = new Meteor.Collection("products");

Products.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

images = new FilesCollection({
  storagePath: '/home/projects/vulcaniot.net/assets/app/uploads/images',
  collectionName: 'images',
  allowClientCode: true, // Required to let you remove uploaded file
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 80485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  },
  onAfterUpload(file) {

  }
});

// Attribute
AttributesSchema = new SimpleSchema({
  // attribute

  // value
});

// images
ImageSchema = new SimpleSchema({
  // image
  image: {
    type: String,
    label: "Image",
    autoform: {
      type: "fileUpload",
      collection: 'images',
      insertConfig: { // <- Optional, .insert() method options, see: https://github.com/VeliovGroup/Meteor-Files/wiki/Insert-(Upload)
          meta: {},
          isBase64: false,
          transport: 'ddp',
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true
        }
    }
  },

  // alt
  alt: {
    type: String,
    label: "Alt"
  },

  // order
  order: {
    type: String,
    label: "Order"
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

// Product
ProductsSchema = new SimpleSchema({
  category: {
    type: String,
    label: "Category",
    autoform: {
      type: "select",
      options: []
    }
  },

  subCategory: {
    type: String,
    label: "Sub Category",
    autoform: {
      type: "select",
      options: []
    }
  },

  // name
  name: {
    type: String,
    label: "Name"
  },

  // description
  description: {
    type: String,
    label: 'Description',
    autoform: {
      type: "textarea",
    }
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
        {
          label: "Immature Plant",
          value: "Immature Plant"
        },
        {
          label: "Vegetative Plant",
          value: "Vegetative Plant"
        },
        {
          label: "Hash Oil",
          value: "Hash Oil"
        },
      ]
    }
  },

  // Quantity
  quantity: {
    type: String,
    label: "Quantity"
  },

  // UnitOfMeasureName
  unitOfMeasureName: {
    type: String,
    label: "Unit Of Measure",
    autoform: {
      type: "select",
      options: [
        {
          label: "Each (ea)",
          value: "Each"
        },
        {
          label: "Ounces (oz)",
          value: "Ounces"
        },
        {
          label: "Pounds (lb)",
          value: "Pounds"
        },
        {
          label: "Grams (g)",
          value: "Grams"
        },
        {
          label: "Milligrams (mg)",
          value: "Milligrams"
        },
        {
          label: "Kilograms (kg)",
          value: "Kilograms"
        },
        {
          label: "Metric Tons (t)",
          value: "Metric Tons"
        },
      ]
    }
  },

  // lowStock
  lowStock: {
    type: String,
    label: "Low Stock"
  },

  // status
  status: {
    type: String,
    label: "Status",
    autoform: {
      type: "select",
      options: [
        {
          label: "In Stock",
          value: "In Stock"
        },
        {
          label: "On Sale",
          value: "On Sale"
        },
        {
          label: "Out Of Stock",
          value: "Out Of Stock"
        },
        {
          label: "Back Ordered",
          value: "Back Ordered"
        },
        {
          label: "Discontinued",
          value: "Discontinued"
        },
      ]
    }
  },

  // price
  price: {
    type: String,
    label: "Price"
  },

  salePrice: {
    type: String,
    label: "Sale Price"
  },

  // attributes

  // images
  images: {
    type: Array
  },
  'images.$': ImageSchema,

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

  // LastModified
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
Products.attachSchema(ProductsSchema);

// methods
Meteor.methods({
  //update
  'productsUpdate': function(id, products) {
    Products.update(id, products);
  },
  // create
  'productsCreate': function(products) {
      Products.insert(products);
  },
  // remove
  'productsRemove': function(id) {
    Products.remove({_id: id});
  }
});
