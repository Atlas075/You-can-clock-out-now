DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;




CREATE TABLE employee (
    emp_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name VARCHAR(30) NOT NULL,
    job_title VARCHAR(25) NOT NULL,
    job_id INTEGER NOT NULL,
    dep_id INTEGER NOT NULL,
    salary INTEGER NOT NULL,
    manager_id INTEGER NOT NULL
);

CREATE TABLE department (
    dep_id INTEGER AUTO_INCREMENT PRIMARY KEY REFERENCES employee(dep_id) ON DELETE SET NULL,
    dep_name VARCHAR(20)
); 

CREATE TABLE roles (
    job_title VARCHAR(25) PRIMARY KEY NOT NULL,
    job_id INTEGER NOT NULL REFERENCES employee(job_id) ON DELETE SET NULL,
    dep_name VARCHAR(20),
    salary INTEGER
);    
