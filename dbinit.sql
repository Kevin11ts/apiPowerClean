CREATE TABLE USUARIOS (
  IdUsuario SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  password VARCHAR NOT NULL,
  phone VARCHAR(10) UNIQUE,  -- Permitimos nulos
  user_type VARCHAR(20) CHECK (user_type IN ('cliente', 'trabajador')), -- Permitimos nulos
  nickname VARCHAR(30) UNIQUE,  -- Permitimos nulos
  image_url TEXT,  -- Permitimos nulos
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE,
  deleted_at TIMESTAMP WITHOUT TIME ZONE
);


-- Inserción de registros de ejemplo
INSERT INTO USUARIOS (name, email, password, phone, user_type, nickname, image_url)
VALUES 
('Power Clean', 'powerclean@gmail.com', 'powerclean', '1234567890', 'cliente', 'powerclean', 'https://res.cloudinary.com/demo/image/upload/v12345678/powerclean.jpg'),
('John Doe', 'john.doe@gmail.com', 'password123', '1234567891', 'trabajador', 'johndoe', 'https://res.cloudinary.com/demo/image/upload/v12345678/johndoe.jpg'),
('Jane Smith', 'jane.smith@gmail.com', 'password123', '1234567892', 'trabajador', 'janesmith', 'https://res.cloudinary.com/demo/image/upload/v12345678/janesmith.jpg'),
('Michael Jordan', 'michael.jordan@gmail.com', 'password123', '1234567893', 'trabajador', 'michael23', 'https://res.cloudinary.com/demo/image/upload/v12345678/michael23.jpg'),
('Emily Clark', 'emily.clark@gmail.com', 'password123', '1234567894', 'trabajador', 'emilyc', 'https://res.cloudinary.com/demo/image/upload/v12345678/emilyc.jpg'),
('William King', 'william.king@gmail.com', 'password123', '1234567895', 'trabajador', 'willking', 'https://res.cloudinary.com/demo/image/upload/v12345678/willking.jpg'),
('Olivia Brown', 'olivia.brown@gmail.com', 'password123', '1234567896', 'trabajador', 'oliviab', 'https://res.cloudinary.com/demo/image/upload/v12345678/oliviab.jpg'),
('David Miller', 'david.miller@gmail.com', 'password123', '1234567897', 'trabajador', 'davidm', 'https://res.cloudinary.com/demo/image/upload/v12345678/davidm.jpg'),
('Sophia Wilson', 'sophia.wilson@gmail.com', 'password123', '1234567898', 'trabajador', 'sophiaw', 'https://res.cloudinary.com/demo/image/upload/v12345678/sophiaw.jpg'),
('Liam Martin', 'liam.martin@gmail.com', 'password123', '1234567899', 'trabajador', 'liamm', 'https://res.cloudinary.com/demo/image/upload/v12345678/liamm.jpg'),
('Isabella Davis', 'isabella.davis@gmail.com', 'password123', '1234567800', 'trabajador', 'isabellad', 'https://res.cloudinary.com/demo/image/upload/v12345678/isabellad.jpg');

/*CREATE EXTENSION pgcrypto;

CREATE OR REPLACE FUNCTION encriptar_contraseña()
	RETURNS TRIGGER AS $CUERPO$
	BEGIN
	NEW.password := PGP_SYM_ENCRYPT(NEW.password, 'AES_KEY')
	;
	RETURN NEW;
	END;
	$CUERPO$ LANGUAGE plpgsql;
	
	CREATE TRIGGER encriptar_contraseña
	BEFORE INSERT OR UPDATE ON USUARIOS
	FOR EACH ROW
	EXECUTE FUNCTION encriptar_contraseña();
  */
	
/*-----------------------------------------------------------*/
CREATE TABLE ROLES(
  IdRol SERIAL,
  TipoRol VARCHAR(40) NOT NULL,
  PRIMARY KEY(IdRol)
);
INSERT INTO ROLES(TipoRol)
VALUES
('clienteistrador'),
('Empleado'),
('Cajero'),
('Contador');
/*-----------------------------------------------------------*/

CREATE TABLE CLIENTES (
    IdCliente SERIAL, 
    Nombre VARCHAR(40) NOT NULL, 
    ApellidoPaterno VARCHAR(40) NOT NULL, 
    ApellidoMaterno VARCHAR(40) NULL, 
    FechaNacimiento DATE NOT NULL CHECK (FechaNacimiento < CURRENT_DATE),
    Telefono VARCHAR(10) NOT NULL CHECK (Telefono ~ '^[0-9]{10}$'),
    IdUsuario INT NOT NULL, 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP WITHOUT TIME ZONE,
    delete_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (IdCliente),
    FOREIGN KEY (IdUsuario) REFERENCES USUARIOS(IdUsuario)
);
INSERT INTO CLIENTES (Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, IdUsuario)
VALUES 
('Juan', 'Pérez', 'Gómez', '1990-05-14', '5512345678', 1),
('María', 'López', 'Ramírez', '1985-08-22', '5587654321', 2),
('Carlos', 'Sánchez', 'Hernández', '1992-11-30', '5567890123', 3),
('Ana', 'Martínez', 'Jiménez', '1997-04-18', '5578901234', 4),
('José', 'González', 'Rosas', '1988-02-12', '5554321098', 5),
('Laura', 'Hernández', 'Díaz', '1995-09-09', '5512340987', 6),
('Luis', 'Rodríguez', 'Pérez', '1993-01-23', '5543210987', 7),
('Gabriela', 'Torres', 'Moreno', '1996-03-15', '5523456789', 8),
('Miguel', 'Vargas', 'Ruiz', '1991-07-01', '5567895432', 9)
;
/*-----------------------------------------------------------*/
CREATE TABLE EMPLEADOS (
  IdEmpleado SERIAL, 
  Nombre VARCHAR(40) NOT NULL, 
  ApellidoPaterno VARCHAR(40) NOT NULL, 
  ApellidoMaterno VARCHAR(40) NULL, 
  Telefono VARCHAR(10) NOT NULL CHECK (Telefono ~ '^[0-9]{10}$'), 
  RFC VARCHAR(13) UNIQUE NOT NULL CHECK (RFC ~ '^[A-Z0-9]{13}$'), 
  FechaNacimiento DATE NOT NULL CHECK (FechaNacimiento < CURRENT_DATE), 
  NSS VARCHAR(11) UNIQUE NOT NULL CHECK (NSS ~ '^[0-9]{11}$'), 
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP WITHOUT TIME ZONE,
  delete_at TIMESTAMP WITHOUT TIME ZONE,
  IdUsuario INT NOT NULL, 
  IdRol INT NOT NULL, 
  PRIMARY KEY (IdEmpleado),
  FOREIGN KEY (IdUsuario) REFERENCES USUARIOS(IdUsuario),
  FOREIGN KEY (IdRol) REFERENCES ROLES(IdRol)
);
INSERT INTO EMPLEADOS (Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, RFC, FechaNacimiento, NSS, IdUsuario, IdRol) VALUES
('Carlos', 'Fernandez', 'Gomez', '5512345678', 'FEGC850715MBC', '1985-07-15', '12345678900', 1, 2),
('Ana', 'Perez', 'Lopez', '5543218765', 'PELA900301HTL', '1990-03-01', '11987654321', 2, 3),
('Luis', 'Martinez', 'Hernandez', '5587654321', 'MAHE950214LMN', '1995-02-14', '11422233344', 3, 2),
('Maria', 'Sanchez', 'Diaz', '5598765432', 'SADI870923JPL', '1987-09-23', '98765442101', 4, 1),
('Jorge', 'Hernandez', 'Reyes', '5511223344', 'HERR790310PLC', '1979-03-10', '11243344556', 5, 3),
('Claudia', 'Gomez', 'Mendoza', '5523456789', 'GOME850715FBC', '1985-07-15', '22243344455', 6, 1)
;

/*-----------------------------------------------------------*/
CREATE TABLE TIPO_PRODUCTOS(
  IdTipoProducto SERIAL, 
  Tipo VARCHAR(40) NOT NULL, 
  PRIMARY KEY (IdTipoProducto)
);
 
/*-----------------------------------------------------------*/
CREATE TABLE PRODUCTOS (
  IdProducto SERIAL, 
  Nombre VARCHAR(40) NOT NULL, 
  Descripcion TEXT NOT NULL, 
  PrecioMayoreo NUMERIC(10, 2) NOT NULL,
  PrecioMenudeo NUMERIC(10, 2) NOT NULL,
  PrecioVendedor NUMERIC(10, 2) NOT NULL,
  IdTipoProducto INT NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
  delete_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
  PRIMARY KEY (IdProducto),
  FOREIGN KEY (IdTipoProducto) REFERENCES TIPO_PRODUCTOS(IdTipoProducto)
);

INSERT INTO PRODUCTOS(Nombre, Descripcion, PrecioMayoreo, PrecioMenudeo, PrecioVendedor, IdTipoProducto)
VALUES 
('Cloro Espumoso', 'Desinfecta superficies difíciles', 14.00, 16.00, 8.00, 1),
('Vanish Quita Manchas', 'Remueve manchas y blanquea', 14.00, 15.00, 10.00, 1),
('Limpia Cristales', 'Detergente biodegradable para limpiar y desengrasar', 15.00, 17.00, 10.00, 1),
('Detergente Zote', 'Jabón de lavandería puro', 18.00, 20.00, 15.00, 1),
('Glicerina concentrada', 'Compuesto orgánico', 90.50, 100.00, 70.50, 1),
('Aromatizante Stefano', 'Ofrece una protección eficaz contra el mal olor', 15.00, 16.75, 12.00, 2),
('Aromatizante Coco', 'Concentrado de alto rendimiento con aroma agradable que permanece por varias horas en el ambiente', 16.00, 17.80, 19.00, 2),
('Aromatizante Uva', 'Aroma agradable y alto rendimiento', 18.00, 21.00, 15.00, 2),
('Aromatizante Chicle', 'Fragancia caracterizada por sus notas típicas de chicle', 22.00, 25.20, 19.00, 2),
('Aromatizante Menta Limón', 'Aroma único y de notoria calidez', 25.00, 27.50, 20.00, 2),
('Lavanda', 'Fragancia a base de agua con notas aromáticas y florales', 30.00, 35.00, 27.00, 3),
('Mar Fresco', 'Perfecto para mantener superficies limpias y brillantes', 28.00, 34.00, 23.70, 3),
('Chica Fresa', 'Fragancia para dar aroma a productos de cuidado personal', 31.00, 36.00, 27.99, 3),
('Canela', 'Limpiador multiusos con fragancia y pH nivelado', 26.00, 30.00, 22.70, 3),
('Nordico', 'Es adecuado para casi cualquier tarea y superficie de la casa', 22.00, 25.00, 18.40, 3),
('Fresa', 'Desinfecta y limpia tus manos', 30.00, 35.99, 27.10, 4),
('Manzana Kiwi', 'Jabón líquido con agradable aroma a manzana-kiwi', 35.00, 40.60, 30.00, 4),
('Sandía', 'Elimina gérmenes, bacterias y suciedad de la piel', 28.00, 34.99, 22.00, 4),
('Durazno', 'Contiene detergentes y agentes protectores de la piel', 22.00, 26.10, 15.00, 4),
('Mora Azul', 'Jabón antibacterial para lavado de manos y cuerpo', 23.00, 27.00, 19.00, 4);

/*-----------------------------------------------------------*/
CREATE TABLE INVENTARIOS (
  IdInventario SERIAL, 
  Cantidad FLOAT NOT NULL, 
  IdProducto INT NOT NULL,
  NombreProducto VARCHAR(40) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP WITHOUT TIME ZONE,
  delete_at TIMESTAMP WITHOUT TIME ZONE,
  PRIMARY KEY (IdInventario),
  FOREIGN KEY(IdProducto) REFERENCES PRODUCTOS(IdProducto)
);
INSERT INTO INVENTARIOS (Cantidad, IdProducto, NombreProducto)
VALUES 
(400, 1, 'Cloro Espumoso'),
(500, 2, 'Vanish Quita Manchas'),
(800, 3, 'Limpia Cristales'),
(550, 4, 'Detergente Zote'),
(350, 5, 'Glicerina concentrada'),
(1000, 6, 'Aromatizante Stefano'),
(1500, 7, 'Aromatizante Coco'),
(700, 8, 'Aromatizante Uva'),
(200, 9, 'Aromatizante Chicle'),
(335, 10, 'Aromatizante Menta Limón'),
(1300, 11, 'Lavanda'),
(2000, 12, 'Mar Fresco'),
(983, 13, 'Chica Fresa'),
(1900, 14, 'Canela'),
(400, 15, 'Nordico'),
(560, 16, 'Fresa'),
(390, 17, 'Manzana Kiwi'),
(670, 18, 'Sandía'),
(1050, 19, 'Durazno'),
(1006, 20, 'Mora Azul');


/*-----------------------------------------------------------*/

CREATE TABLE VENTAS(
  FolioVenta SERIAL, 
  Total DOUBLE PRECISION NOT NULL CHECK (Total >= 0), 
  FechaVenta TIMESTAMP NULL,
  IdCliente INT NOT NULL, 
  IdEmpleado INT NOT NULL, 
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (FolioVenta),
  FOREIGN KEY(IdCliente) REFERENCES CLIENTES(IdCliente),
  FOREIGN KEY(IdEmpleado) REFERENCES EMPLEADOS(IdEmpleado)
);
INSERT INTO VENTAS(Total, FechaVenta, IdCliente, IdEmpleado)
VALUES
(500.00, '2024-01-20 10:30:00', 1, 1),
(350.00, '2024-02-10 12:00:00', 2, 2);

/*-----------------------------------------------------------*/
CREATE TABLE DETALLE_VENTAS (
  IdDetalleVenta SERIAL,
  FolioVenta INT NOT NULL,
  IdProducto INT NOT NULL,
  Cantidad INTEGER NOT NULL CHECK (Cantidad > 0),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (IdDetalleVenta),
  FOREIGN KEY (FolioVenta) REFERENCES VENTAS(FolioVenta),
  FOREIGN KEY (IdProducto) REFERENCES PRODUCTOS(IdProducto)
);

INSERT INTO DETALLE_VENTAS(FolioVenta, IdProducto, Cantidad)
VALUES
(1, 1, 10),
(1, 2, 5),
(2, 3, 7),
(2, 4, 3);
/*-----------------------------------------------------------*/