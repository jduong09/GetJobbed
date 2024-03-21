SELECT name, position, application_status, job_uuid FROM jobs
  WHERE (job_uuid = ${job_uuid});