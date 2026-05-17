const JobRequest = require("../models/JobRequest");

// GET all jobs
const getJobs = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.q) {
      filter.$or = [
        { title: { $regex: req.query.q, $options: "i" } },
        { category: { $regex: req.query.q, $options: "i" } },
      ];
    }

    const jobs = await JobRequest.find(filter);

    res.json(jobs);
  } catch (error) {
    next(error);
  }
};

// GET single job
const getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
};

// CREATE job
const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error("Title and Description are required");
    }

    const job = await JobRequest.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

// UPDATE job
const updateJob = async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail, status } = req.body;

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    if (title) job.title = title;
    if (description) job.description = description;
    if (category) job.category = category;
    if (location !== undefined) job.location = location;
    if (contactName !== undefined) job.contactName = contactName;
    if (contactEmail !== undefined) job.contactEmail = contactEmail;
    if (status) job.status = status;

    const updatedJob = await job.save();

    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
};

// DELETE job
const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    await job.deleteOne();

    res.json({ message: "Job deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};