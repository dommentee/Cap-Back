-- commends
-- \l \c \dt
-- SELECT *
CREATE DATABASE medical_procedures;

CREATE TABLE procedures(
    procedure_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    price decimal
);
--create data INSERT
INSERT INTO procedures (name, price) VALUES ('Facial', 120);
INSERT INTO procedures (name, price) VALUES ('Joint Replacement', 8900);
INSERT INTO procedures (name, price) VALUES ('Heart Bypass', 23000);
