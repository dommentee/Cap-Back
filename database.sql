-- commends
-- \l \c \dt
-- SELECT *
CREATE DATABASE medical_procedures;

CREATE TABLE procedures(
    procedure_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    price decimal,
    hospitalName VARCHAR(30),
    hospitalCity VARCHAR(30),
    hospitalState VARCHAR(30),
    hospitalRating decimal,
    healTime decimal


);

--create data INSERT
INSERT INTO procedures (name, price) VALUES ('Facial', 120);
INSERT INTO procedures (name, price) VALUES ('Joint Replacement', 8900);
INSERT INTO procedures (name, price) VALUES ('Heart Bypass', 23000);

--alter table
ALTER TABLE procedures
ADD healTime decimal;


INSERT INTO procedures (name, price, hospitalName, hospitalCity, hospitalState, hospitalRating, healTime) VALUES ('Broken bone', 3500, 'Carney', 'Boston', 'Ma', 7.8, 46)
