INSERT INTO roles
(job_title, job_id, dep_name, salary)
VALUES
('Correctional Officer 2', '108', 'Single Cells', '50000'),
('Correctional Officer 3', '107', 'Restrictive Housing', '50000'),
('Correctional Sergeant 2', '106', 'Single Cells', '60000'),
('Correctional Sergeant 3', '105', 'Restrictive Housing', '60000'),
('Correctional LT', '102', 'Operations', '70000'),
('Correctional Captain', '101', 'Operations', '80000');



INSERT INTO employee
(emp_id, First_Name, Last_Name, job_title, job_id, dep_id, salary, manager_id)
VALUES

('1101', 'Mike', 'Bruno', 'Corectional Officer 2', '108', '2', '50000', '1202'),
('1102', 'Taylor', 'Miller', 'Corectional Officer 3', '107', '2', '50000', '1201'),
('1103', 'Donovan', 'Massenburg', 'Corectional Officer 3', '107', '3', '50000', '1203'),
('1104', 'Nigel', 'Wilson', 'Corectional Officer 3', '107', '1', '50000', '1203'),
('1105', 'Jamil', 'Jafarov', 'Corectional Officer 2', '108', '1', '50000', '1201'),
('1106', 'Katrice', 'Kunningham', 'Corectional Officer 2', '108', '3', '50000', '1202'),
('1107', 'Austin', 'Pearce', 'Corectional Officer 3', '107', '3', '50000', '1203'),
('1108', 'Charles', 'Corbett', 'Corectional Officer 3', '107', '2', '50000', '1201'),
('1109', 'Reginald', 'Morgan', 'Corectional Officer 2', '108', '2', '50000', '1202'),
('1202', 'Joseph', 'Bowen', 'Corectional Sergeant 2', '106', '1', '60000', '1301'),
('1201', 'Ten', 'Jones', 'Corectional Sergeant 3', '105', '3', '60000', '1301'),
('1203', 'San', 'Hawkins', 'Corectional Sergeant 2', '106', '2', '60000', '1301'),
('1301', 'Gary', 'Averett', 'Corectional LT', '102', '9', '70000', '1401'),
('1401', 'Charles', 'Sanders', 'Corectional Captain', '101', '9', '80000', '1501');



INSERT INTO department
(dep_name)
VALUES
('Single Cell 1'),
('Single Cell 2'),
('Single Cell 3'),
('Dorms 1 + 2'),
('Dorms 3 + 4'),
('Operations');