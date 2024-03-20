ALTER TABLE jobs
  ADD COLUMN job_uuid UUID NOT NULL DEFAULT gen_random_uuid();