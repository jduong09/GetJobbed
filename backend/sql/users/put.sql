INSERT INTO users (email)
VALUES(${email_address})
RETURNING id;