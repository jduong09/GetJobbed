DELETE FROM jobs
WHERE job_uuid = ${job_uuid}
RETURNING *;