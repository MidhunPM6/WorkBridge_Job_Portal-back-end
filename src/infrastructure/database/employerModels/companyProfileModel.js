import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  headquarter: {
    type: String,
    trim: true
  },
  sizeOfCompany: {
    type: String,
    trim: true
  },
  overview: {
    type: String,
    trim: true
  },
  about: {
    type: String,
    trim: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
   
   
  },
  createdAt: {
    type: String,
    default: () => new Date().toString()
  },
  updatedAt: {
    type: String,
    default: () => new Date().toString()
  }
});

export const companyProfileModel = mongoose.model('CompanyProfile', companyProfileSchema);


