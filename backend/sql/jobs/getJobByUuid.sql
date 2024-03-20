SELECT name, position, application_status FROM jobs
  WHERE (job_uuid = ${job_uuid});