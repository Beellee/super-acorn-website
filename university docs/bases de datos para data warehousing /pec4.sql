SET search_path TO erp;
-- EJERCICIO 1: 

-- APARTADO 1)
--Creo la secuencia
CREATE SEQUENCE seq_cars_id
START WITH 100
INCREMENT BY 1;
--Añado la columna cars_id
ALTER TABLE tb_cars ADD COLUMN cars_id INTEGER NOT NULL DEFAULT nextval('seq_cars_id');
--Reemplazo las claves foraneas que apuntan a cars_registration por cars_id en las tablas tb_lines_invoice y tb_refueling.Para ello:
-- 1. añado una nueva columna con los mismos valores que cars_registration
ALTER TABLE tb_lines_invoice ADD COLUMN cars_id INTEGER;
UPDATE tb_lines_invoice
SET cars_id = tb_cars.cars_id
FROM tb_cars
WHERE tb_lines_invoice.cars_registration = tb_cars.cars_registration;
-- 2. añado cars_id como foreign key, (para ello antes establezco un unique constraint)
ALTER TABLE tb_cars ADD UNIQUE (cars_id);
ALTER TABLE tb_lines_invoice
ADD FOREIGN KEY (cars_id) REFERENCES tb_cars(cars_id);
-- 3. elimino la columna cars_registration
ALTER TABLE tb_lines_invoice DROP COLUMN cars_registration;
-- (hago lo mismo para tb_refueling):
ALTER TABLE tb_refueling ADD COLUMN cars_id INTEGER;
UPDATE tb_refueling
SET cars_id = tb_cars.cars_id
FROM tb_cars
WHERE tb_refueling.cars_registration = tb_cars.cars_registration;
ALTER TABLE tb_refueling
ADD FOREIGN KEY (cars_id) REFERENCES tb_cars(cars_id);
ALTER TABLE tb_refueling DROP COLUMN cars_registration;
-- elimino la columna cars_registration de la tabla tb_cars
ALTER TABLE tb_cars DROP COLUMN cars_registration;
--entiendo por el enunciado, que hay que eliminar la columna cars_registration de todas las tablas, si no es así basta con no ejecutar el código donde comento que elimino las columnas 



-- APARTADO 2) 
WITH RECURSIVE pump_cte (pm_id, pm_parent_id, pm_descr, gas_id, liters, parent_list) AS (
    -- obtener los litros totales
    SELECT p.pm_id, p.pm_parent_id, p.pm_descr, p.gas_id, SUM(r.rf_liters) as liters, p.pm_descr || ' -> ' || p.gas_id as parent_list
    FROM erp.tb_pump p
    JOIN erp.tb_refueling r ON p.pm_id = r.pm_id
    GROUP BY p.pm_id, p.pm_parent_id, p.pm_descr, p.gas_id
    UNION ALL
    -- obtener parents
    SELECT p.pm_id, p.pm_parent_id, p.pm_descr, p.gas_id, c.liters, p.gas_id|| ' -> ' ||p.pm_descr|| ' -> ' || c.parent_list as parent_list
    FROM pump_cte c
    JOIN erp.tb_pump p ON c.pm_parent_id = p.pm_id
    JOIN (SELECT pm_id, SUM(rf_liters) as liters
          FROM erp.tb_refueling
          GROUP BY pm_id) r ON p.pm_id = r.pm_id
)
-- obtener solo pumps con más de 300 litros
SELECT pm_id, parent_list,liters
FROM pump_cte
WHERE liters > 300
ORDER BY pm_id;
-- lo he ordenado por pm_id porque es como sale en la imagen del enunciado, si no se desea así, basta con eliminar la última linea de codigo

-- APARTADO 3
SELECT tb_cars.cars_registration, tb_cars.cars_model, tb_refueling.gas_id, tb_refueling.rf_date, tb_refueling.rf_liters, 
  SUM(
    CASE WHEN tb_refueling.rf_date <= tb_refueling.rf_date THEN 1 ELSE 0 END
  ) OVER (
    PARTITION BY tb_cars.cars_registration 
    ORDER BY 
      tb_refueling.rf_date ROWS BETWEEN UNBOUNDED PRECEDING 
      AND CURRENT ROW
  ) AS "position-car", 
  SUM(
    CASE WHEN tb_refueling.rf_date <= tb_refueling.rf_date THEN 1 ELSE 0 END
  ) OVER (
    PARTITION BY tb_cars.cars_registration, 
    tb_refueling.gas_id 
    ORDER BY 
      tb_refueling.rf_date ROWS BETWEEN UNBOUNDED PRECEDING 
      AND CURRENT ROW
  ) AS "position-gas", 
  SUM(
    CASE WHEN tb_refueling.rf_date <= tb_refueling.rf_date THEN tb_refueling.rf_liters ELSE 0 END
  ) OVER (
    PARTITION BY tb_cars.cars_registration 
    ORDER BY 
      tb_refueling.rf_date ROWS BETWEEN UNBOUNDED PRECEDING 
      AND CURRENT ROW
  ) AS "sum" 
FROM 
  tb_cars 
  JOIN tb_refueling ON tb_cars.cars_registration = tb_refueling.cars_registration 
ORDER BY tb_cars.cars_registration, tb_refueling.rf_date, tb_refueling.gas_id;






















--DROP SEQUENCE seq_cars_id CASCADE


--SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS










