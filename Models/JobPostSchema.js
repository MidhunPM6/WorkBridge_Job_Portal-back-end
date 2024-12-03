const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
      index: true,
    },
    comapany_name: {
      type: String,
      required: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


jobPostSchema.index({ title: 1, location: 1 });

const PostedJobs = mongoose.model("PostedJobs", jobPostSchema);

module.exports = PostedJobs;
