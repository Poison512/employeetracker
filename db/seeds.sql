USE buisness;

INSERT INTO department (
    department_name
)
VALUES
('CEO'),
('LEAD'),
('STAFF'),
('HR')

INSERT INTO role 
(title, salary, department_id)
VALUES
('CEO', '1000000.00', 1),
('LEAD', '500000.00', 2),
('STAFF', '400000.00', 3),
('HR', '300000.00', 4)

INSERT INTO employee(
    first_name, last_name, role_id, manager_id
)
VALUES
('Gucci', 'Mane', 1, NULL),
('Zro', 2, 1),
('Dj', 'Screw', 3,2),
('Project', 'Pat' 4, NULL),
('Juicy', 'J', 5,1);
