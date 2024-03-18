SELECT name, position, application_status FROM jobs
  WHERE (user_id = ${user_id})
  ORDER BY id;