DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL (50,2),
    department_id INTEGER
);
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
);

