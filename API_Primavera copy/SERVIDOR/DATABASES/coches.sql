DROP DATABASE IF EXISTS coches;
CREATE DATABASE IF NOT EXISTS coches;
USE coches;

CREATE TABLE IF NOT EXISTS marcas (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50),
    cantidad INT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS concesionarios (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50),
    marcaID INT,
    PRIMARY KEY (id),
    FOREIGN KEY (marcaID) REFERENCES marcas(id)
);

CREATE TABLE IF NOT EXISTS ventas (
    id INT NOT NULL AUTO_INCREMENT,
    marcaID INT,
    concesionariosID INT,
    cantidad_vendida INT,
    PRIMARY KEY (id),
    FOREIGN KEY (marcaID) REFERENCES marcas(id),
    FOREIGN KEY (concesionariosID) REFERENCES concesionarios(id)
);

INSERT INTO marcas (nombre, cantidad) VALUES ("Kia", 66245);
INSERT INTO marcas (nombre, cantidad) VALUES ("Hyundai", 58874);
INSERT INTO marcas (nombre, cantidad) VALUES ("Dacia", 48844);
INSERT INTO marcas (nombre, cantidad) VALUES ("Toyota", 79883);
INSERT INTO marcas (nombre, cantidad) VALUES ("Peugeot", 56176);
INSERT INTO marcas (nombre, cantidad) VALUES ("Volkswagen", 63871);
INSERT INTO marcas (nombre, cantidad) VALUES ("Seat", 58488);
INSERT INTO marcas (nombre, cantidad) VALUES ("Renault", 53176);

INSERT INTO concesionarios (nombre, marcaID) VALUES ("Concesionario A", 1);
INSERT INTO concesionarios (nombre, marcaID) VALUES ("Concesionario B", 2);
INSERT INTO concesionarios (nombre, marcaID) VALUES ("Concesionario C", 3);
INSERT INTO concesionarios (nombre, marcaID) VALUES ("Concesionario D", 4);

INSERT INTO ventas (marcaID, concesionariosID, cantidad_vendida) VALUES (1, 2, 10);
INSERT INTO ventas (marcaID, concesionariosID, cantidad_vendida) VALUES (2, 1, 15);
