import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

// debug
SimpleSchema.debug = true;

Transfers = new Meteor.Collection("transfers");

Transfers.allow({
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

TransfersSchema = new SimpleSchema({
  // customerId
  customerId: {
    type: String,
    label: "Customer Id",

  },

  // ManifestNumber
  ManifestNumber: {
    type: String,
    label: "Manifest Number",
    optional: true,
  },

  // ShipperFacilityLicenseNumber
  ShipperFacilityLicenseNumber: {
    type: String,
    label: "Shipper Facility LicenseNumber",
    optional: true,
  },

  // ShipperFacilityName
  ShipperFacilityName: {
    type: String,
    label: "Shipper Facility Name",
    optional: true,
  },

  // TransporterFacilityLicenseNumber
  TransporterFacilityLicenseNumber: {
    type: String,
    label: "Transporter Facility License Number",
    optional: true,
  },

  // TransporterFacilityName
  TransporterFacilityName: {
    type: String,
    label: "Transporter Facility Name",
    optional: true,
  },

  // DriverName
  DriverName: {
    type: String,
    label: "Driver Name",
    optional: true,
  },

  // DriverOccupationalLicenseNumber
  DriverOccupationalLicenseNumber: {
    type: String,
    label: "Driver Occupational LicenseNumber",
    optional: true,
  },

  // DriverVehicleLicenseNumber
  DriverVehicleLicenseNumber: {
    type: String,
    label: "Driver Vehicle License Number",
    optional: true,
  },

  // VehicleMake
  VehicleMake: {
    type: String,
    label: "Vehicle Make",
    optional: true,
  },

  // VehicleModel
  VehicleModel: {
    type: String,
    label: "Vehicle Model",
    optional: true,
  },

  // VehicleLicensePlateNumber
  VehicleLicensePlateNumber: {
    type: String,
    label: "Vehicle License Plate Number",
    optional: true,
  },

  // DeliveryCount
  DeliveryCount: {
    type: String,
    label: "Delivery Count",
    optional: true,
  },

  // ReceivedDeliveryCount
  ReceivedDeliveryCount: {
    type: String,
    label: "Received DeliveryC ount",
    optional: true,
  },

  // PackageCount
  PackageCount: {
    type: String,
    label: "Package Count",
    optional: true,
  },

  // ReceivedPackageCount
  ReceivedPackageCount: {
    type: String,
    label: "Received Package Count",
    optional: true,
  },

  // CreatedDateTime
  ReceivedPackageCount: {
    type: Date,
    label: "Received Package Count",
    optional: true,
  },

  // CreatedByUserName
  CreatedByUserName: {
    type: String,
    label: "Created By User Name",
  },

  // LastModified
  LastModified: {
    type: Date,
    label: "Last Modified",
    autoValue: function () {
      return new Date();
    },
    autoform: {
      type: "hidden",
    }
  },

  // DeliveryId
  DeliveryId: {
    type: String,
    label: "Delivery Id",
    optional: true,
  },

  // RecipientFacilityLicenseNumber
  RecipientFacilityLicenseNumber: {
    type: String,
    label: "Recipient Facility License Number",
    optional: true,
  },

  // RecipientFacilityName
  RecipientFacilityName: {
    type: String,
    label: "Recipient Facility Name",
    optional: true,
  },

  // ShipmentTypeName
  ShipmentTypeName: {
    type: String,
    label: "Shipment Type Name",
    optional: true,
  },

  // ShipmentTransactionType
  ShipmentTransactionType: {
    type: String,
    label: "Shipment Transaction Type",
    optional: true,
  },

  // EstimatedDepartureDateTime
  EstimatedDepartureDateTime: {
    type: Date,
    label: "Estimated Departure Date",
    optional: true,
  },

  // ActualDepartureDateTime
  ActualDepartureDateTime: {
    type: Date,
    label: "Actual Departure Date",
    optional: true,
  },

  // EstimatedArrivalDateTime
  EstimatedArrivalDateTime: {
    type: Date,
    label: "Estimated Arrival Date",
    optional: true,
  },

  // ActualArrivalDateTime
  ActualArrivalDateTime: {
    type: Date,
    label: "Actual Arrival Date",
    optional: true,
  },

  // DeliveryPackageCount
  DeliveryPackageCount: {
      type: String,
      label: "Delivery Package Count",
      optional: true,
    },

  // DeliveryReceivedPackageCount
  DeliveryReceivedPackageCount: {
      type: String,
      label: "Delivery Received Package Count",
      optional: true,
    },

  // ReceivedDateTime
  ReceivedDateTime: {
    type: Date,
    label: "Received Date",
    optional: true,
  },
});

// attach
Transfers.attachSchema(TransfersSchema);

// methods
Meteor.methods({
  //update
  'updateTransfers': function(id, transfers) {
    Transfers.update(id, transfers);
  },
  // create
  'createTransfers': function(transfers) {
      Transfers.insert(transfers);
  },
  // remove
  'removeTransfers': function(id) {
    Transfers.remove({_id: id});
  }
});
