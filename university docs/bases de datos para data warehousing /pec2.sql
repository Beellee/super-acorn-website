-- CREATE DATABASE pec2 -- creamos la base de datos 
-- Ejercicio 1: 
CREATE SCHEMA erp; --creamos el esquema 

CREATE TABLE erp.tb_cars ( -- creamos la tabla tb_cars
	cars_registration CHARACTER(7) NOT NULL PRIMARY KEY,
	cars_model CHARACTER VARYING(50) NOT NULL, 
	cars_function CHARACTER(20) NOT NULL, 
	cars_deposit INTEGER NOT NULL, 
	cars_fuel CHARACTER(10) NOT NULL DEFAULT 'gasoil', 
	cars_date_input DATE NOT NULL DEFAULT now(), 
	cars_employee CHARACTER VARYING(50), 
	cars_date_registration DATE NOT NULL
);

CREATE TABLE erp.tb_gas_station ( -- creamos la tabla tb_gas_station
	gas_id CHARACTER(5) NOT NULL PRIMARY KEY,
	gas_name CHARACTER VARYING(50) NOT NULL UNIQUE 		
);

CREATE TABLE erp.tb_pump ( -- creamos la tabla tb_pump
	pm_id INTEGER NOT NULL PRIMARY KEY,
	pm_parent_id INTEGER REFERENCES erp.tb_pump (pm_id), -- referenciamos clave primaria de tb_pump
	gas_id CHARACTER(5) NOT NULL REFERENCES erp.tb_gas_station (gas_id),  -- referenciamos clave primaria de tb_gas_station
	pm_descr CHARACTER VARYING(20) NOT NULL, 

	UNIQUE(pm_id, gas_id)
);

CREATE TABLE erp.tb_fuel_price ( -- creamos la tabla tb_fuel_price
	fp_date DATE NOT NULL,
	fp_fuel CHARACTER(10) NOT NULL, 
	fp_import NUMERIC(12, 3) NOT NULL,
	
	PRIMARY KEY(fp_date, fp_fuel) -- establecemos la clave primaria (que consiste en 2 columnas)
);

CREATE TABLE erp.tb_refueling ( -- creamos la tabla tb_refueling
	gas_id CHARACTER(5) NOT NULL REFERENCES erp.tb_gas_station (gas_id), -- referenciamos clave primaria de tb_gas_station
	cars_registration CHARACTER(7) NOT NULL REFERENCES erp.tb_cars (cars_registration), -- referenciamos clave primaria de tb_cars
	pm_id INTEGER NOT NULL REFERENCES erp.tb_pump (pm_id), 
	rf_liters INTEGER NOT NULL, 
	rf_date DATE NOT NULL DEFAULT now(), 
	rf_km INTEGER
);

CREATE TABLE erp.tb_invoice ( -- creamos la tabla tb_invoice
	inv_id INTEGER NOT NULL PRIMARY KEY,
	inv_num CHARACTER(5) NOT NULL, 
	inv_date_start DATE NOT NULL, 
	inv_date_end DATE NOT NULL, 
	inv_amount NUMERIC(12,2) NOT NULL, 
	Inv_liters_total INTEGER NOT NULL
);

CREATE TABLE erp.tb_lines_invoice ( -- creamos la tabla tb_lines_invoice
	inv_id INTEGER NOT NULL REFERENCES erp.tb_invoice (inv_id), -- referenciamos clave primaria de tb_invoice
	linv_id INTEGER NOT NULL, 
	cars_registration CHARACTER(7) NOT NULL REFERENCES erp.tb_cars (cars_registration), -- referenciamos clave primaria de tb_cars
	gas_id CHARACTER(5) NOT NULL REFERENCES erp.tb_gas_station (gas_id), -- referenciamos clave primaria de tb_gas_station
	linv_liters INTEGER NOT NULL, 
	linv_amount NUMERIC (12, 2) NOT NULL, 
	
	PRIMARY KEY(inv_id, linv_id) -- establecemos la clave primaria (que consiste en 2 columnas)
);

-- Ejercicio 2: 
-- a)
SELECT cars.cars_registration, cars.cars_model, cars.cars_employee, cars.cars_date_registration
FROM erp.tb_cars AS cars
WHERE cars.cars_function = 'reparto';

--b) 
SELECT car.cars_employee, car.cars_model, gas.gas_name, refi.rf_date
FROM erp.tb_refueling AS refi
JOIN erp.tb_gas_station AS gas
	ON gas.gas_id = refi.gas_id
JOIN erp.tb_cars AS car
	ON car.cars_registration = refi.cars_registration
WHERE refi.rf_date between '2022-08-01' and '2022-08-31' AND refi.rf_liters = 41
ORDER BY car.cars_employee ASC, refi.rf_date DESC;

--c) 
SELECT car.cars_registration, car.cars_employee, SUM(refu.rf_liters)
FROM erp.tb_cars AS car
JOIN erp.tb_refueling AS refu -- entinedo que por el total de litros se refiere a la suma de los valores de la columna rf_liters en la tabla tb_refueling 
	ON refu.cars_registration = car.cars_registration
WHERE car.cars_function = 'comercial'
GROUP BY car.cars_registration,car.cars_employee
ORDER BY SUM(refu.rf_liters) ASC;

--d)

SELECT rep.linv_amount, rep.cars_registration
FROM ( SELECT  inv.linv_amount, car.cars_registration
      FROM erp.tb_lines_invoice AS inv
JOIN erp.tb_cars AS car
	ON inv.cars_registration = car.cars_registration 
WHERE car.cars_function = 'reparto') as rep
GROUP BY rep.linv_amount, rep.cars_registration
HAVING AVG(rep.linv_amount) > 
(SELECT AVG(inv.linv_amount)
FROM erp.tb_lines_invoice AS inv
JOIN erp.tb_cars AS car
	ON inv.cars_registration = car.cars_registration
JOIN erp.tb_refueling AS refu
 	ON refu.cars_registration = inv.cars_registration
WHERE car.cars_function = 'reparto' AND car.cars_model LIKE '%VITO%' AND refu.rf_date between '2022-09-01' and '2022-09-30');


--e)
SELECT car.cars_registration, refu.gas_id, refu.rf_date 
FROM erp.tb_refueling AS refu
JOIN erp.tb_cars AS car
	ON refu.cars_registration = car.cars_registration
WHERE refu.rf_km IS null AND (refu.gas_id = 'GS04' OR refu.gas_id = 'GS05' OR refu.gas_id = 'GS02')
ORDER BY car.cars_registration DESC, refu.rf_date ASC;

-- Ejercicio 3: 
--a)
INSERT INTO erp.tb_cars(
	cars_registration, cars_model, cars_function, cars_deposit, cars_fuel, cars_date_input, cars_employee, cars_date_registration)
	VALUES ('2233JMN','AUDI Q5','gerencia',40,'gasolina',now(),'Carmen Sevilla Calvo',to_date('16-03-2016','DD-MM-YYYY')), 
	('7542LSN','AUDI A1','gerencia',30,DEFAULT,now(),'Carlos Díaz Sevilla',to_date('01-08-2021','DD-MM-YYYY')),
	('1974LBN','AUDI A3','gerencia',35,'gasoil',now(),'Javier Díaz Sevilla',to_date('30-09-2019','DD-MM-YYYY'));

-- b)
DELETE FROM erp.tb_fuel_price
WHERE fp_date NOT IN (SELECT rf_date FROM erp.tb_refueling)

-- c)
ALTER TABLE erp.tb_fuel_price ADD COLUMN fp_import_without_vat NUMERIC(12, 3);
UPDATE erp.tb_fuel_price SET fp_import_without_vat = fp_import - (fp_import * 0.21);
ALTER TABLE erp.tb_fuel_price ALTER COLUMN fp_import_without_vat SET NOT NULL;

-- d)
ALTER TABLE erp.tb_cars ADD CONSTRAINT cars_employee CHECK (cars_function != 'gerencia' OR cars_employee IS NOT NULL)

--e) 
CREATE USER registerer WITH PASSWORD '1234';
GRANT USAGE ON SCHEMA erp TO registerer;
GRANT SELECT, INSERT, UPDATE ON erp.tb_refueling TO registerer;
GRANT SELECT ON erp.tb_cars TO registerer;