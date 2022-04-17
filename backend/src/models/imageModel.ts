import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    _id: { type: String, required: true },
    label: { type: String, required: true },
    url: { type: String, required: true },
    reviewUrl: { type: String, required: true },
    password: { type: String, required: false },
    isProtected: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export const Image = mongoose.model('Image', imageSchema);
