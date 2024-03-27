SELECT name, position, application_status, job_uuid,
  CASE WHEN json_array_length(email) >= 1
  THEN email
  ELSE null
  END
  AS email
  FROM jobs
  WHERE (user_id = ${user_id})
  ORDER BY id;