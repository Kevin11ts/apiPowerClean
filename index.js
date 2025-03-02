import express from 'express';
import productRoutes from './routes/productos/productoRoute.js';
import clienteRoutes from './routes/clientes/clienteRoute.js';
import empleadoRoutes from './routes/empleados/empleadoRoute.js';
import usuarioRoute from './routes/usuarios/usuarioRoute.js';
import rolRoute from './routes/roles/rolRoute.js';
import tipoProductoRoute from './routes/tipoProducto/tipoProductoRoute.js';
import inventarioRoute from './routes/inventario/inventarioRoute.js';
import ventaRoute from './routes/ventas/ventaRoutes.js';
import detalleVentaRoute from './routes/detalleVenta/detalleVentaRoute.js';
import direccionRoutes from './routes/direcciones/direccionRoutes.js';


// Importar rutas para MongoDB
import configuracionRoutes from "./routes/configuracion/configuracionRoute.js";
import datosRoutes from "./routes/datos/datosRoutes.js";

// Importar configuración de Swagger y dotenv
import swaggerDocs from './config/swagger.js';
import dotenv from 'dotenv';

// Importar conexión a PostgreSQL y MongoDB
import './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Inicializar Swagger
swaggerDocs(app);

// Define rutas para PostgreSQL
app.use('/api', productRoutes);
app.use('/api', clienteRoutes);
app.use('/api', empleadoRoutes);
app.use('/api', usuarioRoute);
app.use('/api', rolRoute);
app.use('/api', tipoProductoRoute);
app.use('/api', inventarioRoute);
app.use('/api', ventaRoute);
app.use('/api', detalleVentaRoute);
app.use('/api', direccionRoutes);


// Define rutas para MongoDB
app.use('/configuracion', configuracionRoutes);
app.use('/datos', datosRoutes);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://${process.env.DB_HOST || 'localhost'}:${PORT}`);
});
