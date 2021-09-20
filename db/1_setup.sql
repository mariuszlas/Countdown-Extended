DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
    id serial PRIMARY KEY,
    username VARCHAR(500) NOT NULL,
    score FLOAT NOT NULL
);
