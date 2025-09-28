export default class FetchAllJobsUseCase {
  constructor(jobPostRepository, jobEntity) {
    this.jobPostRepository = jobPostRepository;
    this.jobEntity = jobEntity;
  }

  async execute() {
    try {
      const jobs = await this.jobPostRepository.fetchAllJobs();
      console.log(jobs);

      const rehydratedJobs = jobs.map(job => this.jobEntity.rehydrate({...job, id: job._id}));
      // Remove the _id field from each job object
    

      return rehydratedJobs;
    } catch (error) {
      throw new Error(`Error fetching jobs: ${error.message}`);
    }
  }
}