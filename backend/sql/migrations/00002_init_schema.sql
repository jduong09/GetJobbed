CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  email EMAIL NOT NULL,
  user_uuid UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS jobs (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  email EMAIL[],
  application_status INTEGER,
  user_id BIGINT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tokens (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  refresh_token TEXT NOT NULL,
  expiry_date BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);