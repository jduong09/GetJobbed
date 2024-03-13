INSERT INTO jobs(name, position, application_status, user_id, email)
VALUES (${name}, ${position}, ${application_status}, ${user_id}, ${email})
RETURNING id;