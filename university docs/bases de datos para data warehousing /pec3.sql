-- Ejercicio 1:
-- a)
ALTER TABLE erp.tb_pump 
ADD COLUMN updated_dt_tm TIMESTAMP NOT NULL DEFAULT now(); -- creamos la columna que no permita valores nulos 
-- function 
CREATE OR REPLACE FUNCTION update_tb_pump_table_a()
RETURNS TRIGGER AS
$$
BEGIN
  	UPDATE erp.tb_pump
    SET updated_dt_tm = CURRENT_TIMESTAMP
    WHERE pm_id = NEW.pm_id;
    
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- trigguer
CREATE TRIGGER update_timestamp
AFTER INSERT ON erp.tb_pump
FOR EACH ROW EXECUTE PROCEDURE update_tb_pump_table_a();

-- insert (lo he hecho para comprobar que funciona (ver documento word))
--INSERT INTO erp.tb_pump(pm_id,pm_parent_id,pm_descr,gas_id) VALUES (57,22,'Surtidor Nº1','GS01');


-- b)
ALTER TABLE erp.tb_lines_invoice 
ADD COLUMN line_updated_dt_tm VARCHAR(20);

-- function 
-- Entiendo que como el enunciado no dice nada no se tienen que alterar los valores ya existentes 
CREATE OR REPLACE FUNCTION fn_line_inserted()
RETURNS TRIGGER AS
$$
BEGIN
  NEW.line_updated_dt_tm = to_char(now(), 'YYYY-MM-DD hh:mm');
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- trigguer
CREATE TRIGGER tg_line_inserted
BEFORE INSERT OR UPDATE ON erp.tb_lines_invoice
FOR EACH ROW EXECUTE PROCEDURE fn_line_inserted();

-- insert (lo he hecho para comprobar que funciona (ver documento word))
-- INSERT INTO erp.tb_lines_invoice(inv_id, linv_id, cars_registration, gas_id, linv_liters, linv_amount)VALUES (1,43,'0815GYR','GS02 ',60,120.54);


--c)
ALTER TABLE erp.tb_invoice ADD inv_updated_dt DATE NULL;
ALTER TABLE erp.tb_invoice ADD inv_update_counter INTEGER NULL DEFAULT 0;
ALTER TABLE erp.tb_invoice ADD inv_insert_counter INTEGER NULL DEFAULT 0;

--- function 
CREATE OR REPLACE FUNCTION fn_invoice_updated()
RETURNS TRIGGER AS 
$$
BEGIN
	UPDATE erp.tb_invoice
    SET inv_updated_dt = to_date(line_updated_dt_tm, 'YYYY-MM-DD') FROM erp.tb_lines_invoice
	WHERE erp.tb_lines_invoice.inv_id = erp.tb_invoice.inv_id;
    IF TG_OP = 'UPDATE' THEN
        UPDATE erp.tb_invoice
        SET inv_update_counter = inv_update_counter +1
        WHERE NEW.inv_id = erp.tb_invoice.inv_id;
    ELSE
        UPDATE erp.tb_invoice
        SET inv_insert_counter = inv_insert_counter +1
        WHERE NEW.inv_id = erp.tb_invoice.inv_id;
    END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--- trigger
CREATE TRIGGER tr_update_inv_updated_dt
BEFORE UPDATE OR INSERT ON erp.tb_lines_invoice
FOR EACH ROW
EXECUTE PROCEDURE fn_invoice_updated();

-- updates (los he hecho para comprobar que funciona (ver documento word))
-- UPDATE erp.tb_lines_invoice SET linv_amount = 1000.50 WHERE inv_id = 1 AND linv_id = 2;
-- UPDATE erp.tb_lines_invoice SET linv_amount = 1531.10 WHERE inv_id = 1 AND linv_id = 2;


-- Ejercicio 2: 
--a)
-- add a new column
ALTER TABLE erp.tb_refueling ADD COLUMN rf_cost NUMERIC;

---- FUNCIÓN: 
CREATE OR REPLACE FUNCTION fn_calc_cost()
RETURNS TRIGGER AS 
$$
DECLARE
  fuel_type CHARACTER(10);
  fuel_import NUMERIC(12,3);
BEGIN
	fuel_type= (SELECT cars_fuel
		FROM erp.tb_cars
		WHERE cars_registration = NEW.cars_registration);

   fuel_import = (SELECT fp_import
		FROM erp.tb_fuel_price
		WHERE fp_date = NEW.rf_date AND fp_fuel = fuel_type);			
	NEW.rf_cost = fuel_import * NEW.rf_liters;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--- trigger
CREATE TRIGGER tg_refueling_cost
BEFORE UPDATE OR INSERT ON erp.tb_refueling
FOR EACH ROW
EXECUTE PROCEDURE fn_calc_cost();

-- insert (lo he hecho para comprobar que funciona (ver documento word))
-- INSERT INTO erp.tb_refueling (gas_id,cars_registration,rf_liters,rf_date,pm_id,rf_km) VALUES ('GS01','0019GVM',47,to_date('01-08-2022','DD-MM-YYYY'),23,234561);


--b) 
--function:
CREATE OR REPLACE FUNCTION fn_get_cost_by_car_type(initial_date DATE, final_date DATE, car_function CHARACTER(20))
RETURNS TABLE (cars_function CHARACTER(20), rf_date DATE, rf_liters INT, rf_cost NUMERIC)
language plpgsql
AS $$
BEGIN
  IF length(car_function) > 20 THEN
    RAISE EXCEPTION 'Longitud excesiva del valor introducido para el tipo de vehículo';
  END IF;

  RETURN QUERY  
  SELECT car.cars_function, refu.rf_date, refu.rf_liters, refu.rf_cost
  FROM erp.tb_refueling refu
  INNER JOIN erp.tb_cars car 
  ON car.cars_registration = refu.cars_registration
  WHERE car.cars_function = car_function AND refu.rf_date BETWEEN initial_date AND final_date;
END; $$

-- consulta y consulta con error: (los he hecho para comprobar que funciona (ver documento word))
-- consulta 
-- SELECT * FROM fn_get_cost_by_car_type('2022-08-01', '2022-08-015', 'reparto')
-- error
-- SELECT * FROM fn_get_cost_by_car_type('2022-08-01', '2022-08-015', 'vehiculos destinados al reparto de mercancías')


-- c)
CREATE TABLE erp.tb_invoice_cost_summary (
  cars_registration CHARACTER(7) NOT NULL,
  cars_fuel CHARACTER(10) NOT NULL,
  invoice_year INTEGER NOT NULL,
  invoice_quarter INTEGER NOT NULL,
  invoice_month VARCHAR(7) NOT NULL,
  total_liters NUMERIC NOT NULL,
  total_cost NUMERIC NOT NULL,
  number_of_lines INTEGER NOT NULL,
  timestamp TIMESTAMP NOT NULL
);

DO $$
DECLARE
  row_record record;
BEGIN
  FOR row_record IN
    SELECT tb_cars.cars_registration, tb_cars.cars_fuel, EXTRACT(YEAR FROM tb_invoice.inv_date_start) AS invoice_year, EXTRACT(QUARTER FROM tb_invoice.inv_date_start) AS invoice_quarter, CONCAT(EXTRACT(YEAR FROM tb_invoice.inv_date_start), '-', EXTRACT(MONTH FROM tb_invoice.inv_date_start)) AS invoice_month, SUM(tb_lines_invoice.linv_liters) AS total_liters, SUM(tb_lines_invoice.linv_amount) AS total_cost, COUNT(tb_lines_invoice.inv_id) AS number_of_lines
    FROM erp.tb_cars
    INNER JOIN erp.tb_lines_invoice ON tb_cars.cars_registration = tb_lines_invoice.cars_registration
    INNER JOIN erp.tb_invoice ON tb_invoice.inv_id = tb_lines_invoice.inv_id
    GROUP BY invoice_month, tb_cars.cars_registration, tb_invoice.inv_date_start
  LOOP
    INSERT INTO erp.tb_invoice_cost_summary(cars_registration, cars_fuel, invoice_year, invoice_quarter, invoice_month, total_liters, total_cost, number_of_lines, timestamp)
    VALUES (row_record.cars_registration, row_record.cars_fuel, row_record.invoice_year, row_record.invoice_quarter, row_record.invoice_month, row_record.total_liters, row_record.total_cost, row_record.number_of_lines, CURRENT_TIMESTAMP);
  END LOOP;
END $$;
