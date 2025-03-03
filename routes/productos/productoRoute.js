/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - Nombre
 *         - Descripcion
 *         - PrecioMayoreo
 *         - PrecioMenudeo
 *         - PrecioVendedor
 *         - IdTipoProducto
 *       properties:
 *         IdProducto:
 *           type: integer
 *           description: ID único del producto (clave primaria)
 *         Nombre:
 *           type: string
 *           description: Nombre del producto
 *         Descripcion:
 *           type: string
 *           description: Descripción del producto
 *         PrecioMayoreo:
 *           type: number
 *           format: float
 *           description: Precio de mayoreo del producto
 *         PrecioMenudeo:
 *           type: number
 *           format: float
 *           description: Precio de menudeo del producto
 *         PrecioVendedor:
 *           type: number
 *           format: float
 *           description: Precio para el vendedor
 *         IdTipoProducto:
 *           type: integer
 *           description: ID del tipo de producto asociado
 *         image_url:
 *           type: string
 *           description: URL de la imagen del producto
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del producto
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización del producto
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del producto (soft delete)
 *       example:
 *         IdProducto: 1
 *         Nombre: "Producto A"
 *         Descripcion: "Descripción del Producto A"
 *         PrecioMayoreo: 100.50
 *         PrecioMenudeo: 120.00
 *         PrecioVendedor: 110.00
 *         IdTipoProducto: 2
 *         image_url: "https://example.com/imagen.jpg"
 *         created_at: "2024-01-01T12:00:00Z"
 *         updated_at: "2024-01-02T12:00:00Z"
 *         delete_at: null
 */

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Lista todos los productos que no están marcados como eliminados.
 *     tags: [Producto]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     description: Obtiene un producto específico basado en su ID.
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     description: Crea un nuevo producto en la base de datos. Permite subir una imagen.
 *     tags: [Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               PrecioMayoreo:
 *                 type: number
 *                 format: float
 *               PrecioMenudeo:
 *                 type: number
 *                 format: float
 *               PrecioVendedor:
 *                 type: number
 *                 format: float
 *               IdTipoProducto:
 *                 type: integer
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del producto
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     description: Actualiza los datos de un producto específico. Permite cambiar la imagen.
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               PrecioMayoreo:
 *                 type: number
 *                 format: float
 *               PrecioMenudeo:
 *                 type: number
 *                 format: float
 *               PrecioVendedor:
 *                 type: number
 *                 format: float
 *               IdTipoProducto:
 *                 type: integer
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Nueva imagen del producto (opcional)
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     description: Marca un producto como eliminado en la base de datos.
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/productos/search/{q}:
 *   get:
 *     summary: Busca productos en todas las columnas
 *     description: Busca productos usando una cadena de búsqueda que coincide con varias columnas.
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Cadena de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/downloadProductos:
 *   get:
 *     summary: Descarga un archivo Excel con la lista de productos
 *     description: Genera y descarga un archivo Excel con información de los productos.
 *     tags: [Producto]
 *     responses:
 *       200:
 *         description: Archivo Excel generado
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error del servidor
 */

import express from 'express';
import ProductController from '../../controllers/productos/productoController.js';
import upload from '../../config/multerConfig.js'; // Importa Multer

const router = express.Router();

router.get('/productos', ProductController.getAllProductos);
router.get('/productos/:id', ProductController.getProductoById);
router.post('/productos', upload.single('file'), ProductController.createProducto);
router.put('/productos/:id', upload.single('file'), ProductController.updateProducto);
router.delete('/productos/:id', ProductController.deleteProducto);
router.get('/productos/search/:q', ProductController.searchAllColumns);
router.get('/downloadProductos', ProductController.downloadProductosExcel);

export default router;