-- commends
-- \l \c \dt
-- SELECT *
CREATE DATABASE medical_procedures;

CREATE TABLE procedures(
    procedure_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    price decimal,
    hospital_name VARCHAR(30),
    hospital_city VARCHAR(30),
    hospital_state VARCHAR(30),
    hospital_rating decimal,
    heal_time decimal


);

--create data INSERT
INSERT INTO procedures (name, price, hospital_name, hospital_city, hospital_state, hospital_rating, heal_time) VALUES ('Broken bone', 3500, 'Carney', 'Boston', 'Ma', 7.8, 46)


--alter table
ALTER TABLE procedures
ADD  healTime decimal;


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    password VARCHAR(255) 

);

INSERT INTO users (user_name,password) VALUES ('domCharm','test');



