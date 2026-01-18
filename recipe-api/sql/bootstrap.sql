-- Bootstrap script for pantry-staging
-- Run with: psql -v ON_ERROR_STOP=1 -v db_pass='...' -f db/bootstrap.sql

\set ON_ERROR_STOP on

-- 1) Create owner role if missing (password provided at runtime)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'head-chef') THEN
    CREATE ROLE "head-chef" WITH LOGIN PASSWORD :'db_pass';
  END IF;
END
$$;

-- 2) Create DB if missing
SELECT 'CREATE DATABASE "pantry-staging" OWNER "head-chef"'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pantry-staging') \gexec

-- 3) Connect and configure
\c "pantry-staging"

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Optional: default privileges (only needed if future objects might be created by a different role)
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "head-chef";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO "head-chef";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO "head-chef";