INSERT INTO users (name, email)
VALUES(${name}, ${email_address})
RETURNING *;