INSERT INTO tokens(refresh_token, expiry_date, user_id)
VALUES(${refresh_token}, ${expiry_date}, ${user_id})





/*
CREATE TABLE IF NOT EXISTS tokens (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  refresh_token TEXT NOT NULL,
  expiry_date BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
)

*/