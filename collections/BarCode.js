import SimpleSchema from 'simpl-schema';

BarCode = new Meteor.Collection("barCode");

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

// rules
BarCode.allow({
  insert: function (userId, doc) {
    return true;
  },
});

// schema
BarCodeSchema = new SimpleSchema({
  barCode: {
    type: String,
    label: "Bar Code",
  },
  title: {
    type: String,
    label: "Title",
  },
  url: {
    type: String,
    label: "Url",
  }
});

// attach
BarCode.attachSchema(BarCodeSchema);

// methods
Meteor.methods({
  // barCodeCreate
  barCodeCreate: function(barCode, title, url) {
    var result = BarCode.insert({
      barCode: barCode,
      title: title,
      url: url
    });

    return result;
  },
  
  // barCodeRemove
  barCodeRemove: function(barCode) {
    BarCode.remove({barCode:barCode});
  }
});
