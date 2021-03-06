const Prescription = require("./Prescription");

const mongoose = require("mongoose");

// validators
const isFuture = function () {
  return this.startTime > this.createdAt;
};
const isAfterStart = function () {
  return this.finishTime > this.startTime;
};
const isShort = function () {
  // search must be shorter than 30 minutes
  return this.finishTime - this.startTime <= 30 * 60 * 1000;
};

const AppointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  hospital: {
    type: mongoose.Schema.ObjectId,
    ref: "Hospital",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: Date,
    validate: [isFuture, "Start times must be in the future"],
    required: [true, "Please select a starting time"],
  },
  finishTime: {
    type: Date,
    validate: [
      {
        validator: isAfterStart,
        msg: "Finish time must happen be after the start time",
      },
      {
        validator: isShort,
        msg: "Appointments must be shorter than 30 minutes",
      },
    ],
    required: [true, "Please select a finishing time"],
  },
  symptoms: [{
      type: mongoose.Schema.ObjectId,
      ref: "Symptom",
      required: false,
  }]
});

AppointmentSchema.pre('remove', function(next) {
  // remove the Prescription models depending on the current appointment
  Prescription.remove({appointment: this._id}).exec();
  next();
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
