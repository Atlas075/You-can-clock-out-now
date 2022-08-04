INSERT INTO roles
(job_title, dep_name, salary)
VALUES
('Correctional Officer 1', 'Single Cell Three', '50000'),
('Correctional Officer 2', 'Single Cell Two', '50000'),
('Correctional Officer 3', 'Single Cell One', '50000'),
('Correctional Sergeant 1', 'Single Cell Three', '60000'),
('Correctional Sergeant 2', 'Single Cell Two', '60000'),
('Correctional Sergeant 3', 'Single Cell One', '60000'),
('Correctional LT', 'Operations', '70000'),
('Correctional Captain', 'Operations', '80000');



INSERT INTO employee
(First_Name, Last_Name, job_title, dep_name, salary, manager_name)
VALUES

('Mike', 'Bruno', 'Corectional Officer 2', 'Single Cell One', '50000', 'Bowen'),
('Taylor', 'Miller', 'Corectional Officer 3', 'Single Cell Two', '50000', 'Jones'),
('Donovan', 'Massenburg', 'Corectional Officer 3', 'Restrictive Housing', '50000', 'Hawkins'),
('Nigel', 'Wilson', 'Corectional Officer 3', 'Restrictive Housing', '50000', 'Hawkins'),
('Jamil', 'Jafarov', 'Corectional Officer 2',  'Restrictive Housing', '50000', 'Jones'),
('Katrice', 'Kunningham', 'Corectional Officer 2',  'Restrictive Housing', '50000', 'Bowen'),
('Austin', 'Pearce', 'Corectional Officer 3', 'Restrictive Housing', '50000', 'Hawkins'),
('Charles', 'Corbett', 'Corectional Officer 3', 'Single Cell One', '50000', 'Jones'),
('Reginald', 'Morgan', 'Corectional Officer 2',  'Single Cell One', '50000', 'Boewn'),
('Joseph', 'Bowen', 'Corectional Sergeant 2',  'Single Cell Three', '60000', 'Averett'),
('Ten', 'Jones', 'Corectional Sergeant 3', 'Restrictive Housing', '60000', 'Averett'),
('San', 'Hawkins', 'Corectional Sergeant 2',  'Single Cell Three', '60000', 'Averett'),
('Gary', 'Averett', 'Corectional LT', 'Operations', '70000', 'Sanders'),
('Charles', 'Sanders', 'Corectional Captain', 'Operations', '80000', 'null');



INSERT INTO department
(dep_name)
VALUES
('Single Cell One'),
('Single Cell Two'),
('Single Cell Three'),
('Dorms One & Two'),
('Dorms Three & Four'),
('Operations');