SELECT name, position, application_status, job_uuid FROM jobs
  WHERE (user_id = ${user_id})
  ORDER BY id;