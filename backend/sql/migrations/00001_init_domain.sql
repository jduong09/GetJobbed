CREATE EXTENSION IF NOT EXISTS citext;  
DO $$ BEGIN
    IF to_regtype('EMAIL') IS NULL THEN
        CREATE DOMAIN EMAIL AS citext
  			  CHECK (value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');
    END IF;
END $$;