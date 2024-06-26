create database if not exists ejemplo00;
use ejemplo00;
CREATE TABLE IF NOT EXISTS marcas (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50),
    cantidad INT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS concesionarios (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ventas (
    id INT NOT NULL AUTO_INCREMENT,
    marcaID INT,
    concesionarioID INT,
    cantidad vendida INT,
    PRIMARY KEY (id),
    FOREIGN KEY (marcaID) REFERENCES marcas(id),
    FOREIGN KEY (idConcesionarios) REFERENCES concesionarios(id)
);

INSERT INTO marcas (nombre, cantidad) VALUES ("Kia", 66245);
INSERT INTO marcas (nombre, cantidad) VALUES ("Hyundai", 58874);
INSERT INTO marcas (nombre, cantidad) VALUES ("Dacia", 48844);
INSERT INTO marcas (nombre, cantidad) VALUES ("Toyota", 79883);
INSERT INTO marcas (nombre, cantidad) VALUES ("Peugeot", 56176);
INSERT INTO marcas (nombre, cantidad) VALUES ("Volkswagen", 63871);
INSERT INTO marcas (nombre, cantidad) VALUES ("Seat", 58488);
INSERT INTO marcas (nombre, cantidad) VALUES ("Renault", 53176);

INSERT INTO concesionarios (nombre) VALUES ("Concesionario A");
INSERT INTO concesionarios (nombre) VALUES ("Concesionario B");
INSERT INTO concesionarios (nombre) VALUES ("Concesionario C");
INSERT INTO concesionarios (nombre) VALUES ("Concesionario D");

INSERT INTO ventas (marcaID, idConcesionarios) VALUES (1, 2);
INSERT INTO ventas (marcaID, idConcesionarios) VALUES (2, 1);
INSERT INTO ventas (marcaID, idConcesionarios) VALUES (3, 3);
INSERT INTO ventas (marcaID, idConcesionarios) VALUES (4, 2);
INSERT INTO ventas (marcaID, idConcesionarios) VALUES (5, 4);
INSERT INTO ventas (marcaID, idConcesionarios) VALUES (6, 1);
INSERT INTO ventas (marcaID, idConcesionarios) VALUES (7, 3);
INSERT INTO ventas (marcaID, idConcesionarios) VALUES (8, 4);

 