import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor',
      required: [true, 'Donor ID is required.'],
    },
    donationDate: {
      type: Date,
      required: [true, 'Donation date is required.'],
    },
    hospital: {
      type: String,
      required: [true, 'Hospital is required.'],
      trim: true,
      maxlength: [150, 'Hospital name cannot exceed 150 characters.'],
    },
    unitsDonated: {
      type: Number,
      required: [true, 'Units donated is required.'],
      min: [1, 'At least one unit must be donated.'],
    },
  },
  { timestamps: true },
);

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
