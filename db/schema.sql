DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;




CREATE TABLE employee (
    emp_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    job_title VARCHAR(25) NOT NULL,
    dep_name VARCHAR(30) NOT NULL,
    salary INTEGER NOT NULL,
    manager_name VARCHAR(30)
);

CREATE TABLE department (
    dep_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(20) REFERENCES employee(dep_name) ON DELETE SET NULL
); 

CREATE TABLE roles (
    job_title VARCHAR(25) NOT NULL REFERENCES employee(job_title) ON DELETE SET NULL,
    job_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    dep_name VARCHAR(20) REFERENCES employee(dep_name) ON DELETE SET NULL,
    salary INTEGER
);    
