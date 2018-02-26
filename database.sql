CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_phone_or_email 
     CHECK (phone IS NOT NULL OR email IS NOT NULL)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE shifts (
	id SERIAL PRIMARY KEY,
	manager_id INT,
	employee_id INT,
	break REAL,
	start_time TIMESTAMP,
	end_time TIMESTAMP,
 	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
 	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
 	CONSTRAINT fk_ManagerID  FOREIGN KEY (manager_id) REFERENCES users(id),
	CONSTRAINT fk_EmployeeID FOREIGN KEY (employee_id) REFERENCES users(id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON shifts
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


INSERT INTO users (name,role,email,phone,created_at,updated_at) VALUES ('Sara Peterson','manager','speterson@mail.com','555-555-1111',NOW(),NOW());
INSERT INTO users (name,role,email,phone,created_at,updated_at) VALUES ('Jeff Miller','manager','jmiller@mail.com','555-555-2222',NOW(),NOW());
INSERT INTO users (name,role,email,phone,created_at,updated_at) VALUES ('John Clark','employee','jclark@mail.com','555-5555-3333',NOW(),NOW());
INSERT INTO users (name,role,email,phone,created_at,updated_at) VALUES ('Shirley Brady','employee','sbrady@mail.com','555-555-4444',NOW(),NOW());
INSERT INTO users (name,role,email,phone,created_at,updated_at) VALUES ('Chris Anders','employee','canders@mail.com','555-555-5555',NOW(),NOW()); 

INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,3,'2018-02-19 09:00:00','2018-02-19 13:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,3,'2018-02-20 09:00:00','2018-02-20 15:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,4,'2018-02-20 11:00:00','2018-02-20 17:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,4,'2018-02-27 11:00:00','2018-02-27 17:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,4,'2018-03-01 11:00:00','2018-03-01 17:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,3,'2018-02-26 09:00:00','2018-02-26 13:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,3,'2018-02-27 11:00:00','2018-02-27 15:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,5,'2018-02-19 09:00:00','2018-02-19 13:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,5,'2018-02-20 09:00:00','2018-02-20 15:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,5,'2018-02-26 09:00:00','2018-02-26 13:00:00',NOW(),NOW());
INSERT INTO shifts (manager_id,employee_id,start_time,end_time,created_at,updated_at) VALUES (1,5,'2018-02-27 11:00:00','2018-02-27 15:00:00',NOW(),NOW());
