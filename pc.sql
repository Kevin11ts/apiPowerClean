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

/*-----------------------------------------------------------*/
CREATE TABLE ROLES(
  IdRol SERIAL,
  TipoRol VARCHAR(40) NOT NULL,
  PRIMARY KEY(IdRol)
);
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

/*{
  "_id": ObjectId("654321abcdef1234567890ab"),
  "usuario": {
    "name": "Juan Pérez",
    "email": "juan.perez@email.com",
    "password": "hashed_password",
    "phone": "5551234567",
    "user_type": "cliente",
    "nickname": "Juanito",
    "image_url": "https://example.com/avatar.jpg",
    "created_at": ISODate("2025-02-10T12:00:00Z"),
    "updated_at": null,
    "deleted_at": null
  },
  "cliente": {
    "nombre": "Juan",
    "apellido_paterno": "Pérez",
    "apellido_materno": "Gómez",
    "fecha_nacimiento": ISODate("1990-01-15T00:00:00Z"),
    "telefono": "5551234567"
  },
  "empleado": {
    "nombre": "Carlos",
    "apellido_paterno": "López",
    "apellido_materno": "Martínez",
    "telefono": "5559876543",
    "RFC": "ABC1234567890",
    "fecha_nacimiento": ISODate("1985-05-20T00:00:00Z"),
    "NSS": "12345678901",
    "rol": "Administrador"
  },
  "productos": [
    {
      "nombre": "Shampoo",
      "descripcion": "Shampoo anticaspa",
      "precio_mayoreo": 50.00,
      "precio_menudeo": 70.00,
      "precio_vendedor": 60.00,
      "tipo_producto": "Cuidado Personal"
    },
    {
      "nombre": "Jabón",
      "descripcion": "Jabón antibacterial",
      "precio_mayoreo": 20.00,
      "precio_menudeo": 30.00,
      "precio_vendedor": 25.00,
      "tipo_producto": "Higiene"
    }
  ],
  "inventario": {
    "cantidad_total": 150,
    "productos": [
      {
        "nombre": "Shampoo",
        "cantidad": 100
      },
      {
        "nombre": "Jabón",
        "cantidad": 50
      }
    ],
    "created_at": ISODate("2025-02-10T12:00:00Z"),
    "updated_at": null,
    "deleted_at": null
  },
  "ventas": [
    {
      "folio": 12345,
      "total": 500.00,
      "fecha_venta": ISODate("2025-02-09T14:30:00Z"),
      "cliente": {
        "nombre": "Juan Pérez"
      },
      "empleado": {
        "nombre": "Carlos López"
      },
      "detalle_venta": [
        {
          "producto": "Shampoo",
          "cantidad": 2
        },
        {
          "producto": "Jabón",
          "cantidad": 3
        }
      ],
      "created_at": ISODate("2025-02-09T14:30:00Z")
    }
  ]
}

*/