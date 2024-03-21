UPDATE jobs
SET name = ${name},
    position = ${position},
    application_status = ${application_status}
WHERE job_uuid = ${job_uuid}
RETURNING id;