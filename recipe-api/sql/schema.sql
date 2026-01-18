CREATE TABLE users (
  id uuid PRIMARY KEY,
  email text,
  phone text,
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  removed_at timestamp
)

CREATE TABLE recipes (
  id uuid PRIMARY KEY,
  title text NOT NULL,
  subtitle text,
  description text,
  content text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  removed_at timestamp,
  creator_id uuid NOT NULL REFERENCES users(id)
)

CREATE TABLE libraries (
  id uuid PRIMARY KEY,
  creator_id uuid NOT NULL REFERENCES users(id)
)

CREATE TABLE recipes_libraries (
  id uuid PRIMARY KEY,
  libraries_id uuid NOT NULL REFERENCES libraries(id),
  recipe_id uuid NOT NULL REFERENCES recipes(id)
)

CREATE TABLE tags (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW()
)

CREATE TABLE recipes_tags (
  id uuid PRIMARY KEY,
  recipe_id uuid NOT NULL REFERENCES recipes(id),
  tag_id uuid NOT NULL REFERENCES tags(id)
)