CREATE TABLE IF NOT EXISTS scores (
    id serial PRIMARY KEY,
    username VARCHAR(500) NOT NULL,
    score FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS usernames (
    id serial PRIMARY KEY,
    name VARCHAR(500) NOT NULL UNIQUE
);