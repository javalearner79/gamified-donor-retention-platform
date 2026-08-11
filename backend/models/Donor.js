import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters.'],
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required.'],
      uppercase: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'Please provide a valid blood group.',
      },
    },
    lastDonationDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Donor = mongoose.model('Donor', donorSchema);

export default Donor;
