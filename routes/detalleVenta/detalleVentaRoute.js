/**
 * @swagger
 * components:
 *   schemas:
 *     DetalleVenta:
 *       type: object
 *       required:
 *         - FolioVenta
 *         - IdProducto
 *         - Cantidad
 *       properties:
 *         IdDetalleVenta:
 *           type: integer
 *           description: ID único del detalle de venta
 *         FolioVenta:
 *           type: integer
 *           description: Folio de la venta asociada
 *         IdProducto:
 *           type: integer
 *           description: ID del producto vendido
 *         Cantidad:
 *           type: integer
 *           description: Cantidad de producto vendido
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del detalle de venta
 *       example:
 *         IdDetalleVenta: 1
 *         FolioVenta: 1001
 *         IdProducto: 2002
 *         Cantidad: 3
 *         created_at: "2024-01-01T12:00:00Z"
 */

/**
 * @swagger
 * /api/detalleVenta:
 *   get:
 *     summary: Obtiene todos los detalles de ventas
 *     description: Lista todos los detalles de ventas desde la base de datos.
 *     tags: [DetalleVenta]
 *     responses:
 *       200:
 *         description: Lista de detalles de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleVenta'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/detalleVenta:
 *   post:
 *     summary: Crea un nuevo detalle de venta
 *     description: Crea un nuevo detalle de venta en la base de datos.
 *     tags: [DetalleVenta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FolioVenta:
 *                 type: integer
 *                 description: Folio de la venta
 *               IdProducto:
 *                 type: integer
 *                 description: ID del producto
 *               Cantidad:
 *                 type: integer
 *                 description: Cantidad de producto
 *             required:
 *               - FolioVenta
 *               - IdProducto
 *               - Cantidad
 *     responses:
 *       201:
 *         description: Detalle de venta creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleVenta'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/detalleVenta/{id}:
 *   get:
 *     summary: Obtiene un detalle de venta por ID
 *     description: Obtiene un detalle de venta específico basado en el ID.
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de venta
 *     responses:
 *       200:
 *         description: Detalle de venta encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleVenta'
 *       404:
 *         description: Detalle de venta no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/detalleVenta/{id}:
 *   put:
 *     summary: Actualiza un detalle de venta por ID
 *     description: Actualiza un detalle de venta específico basado en el ID.
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FolioVenta:
 *                 type: integer
 *                 description: Folio de la venta
 *               IdProducto:
 *                 type: integer
 *                 description: ID del producto
 *               Cantidad:
 *                 type: integer
 *                 description: Cantidad de producto
 *             required:
 *               - FolioVenta
 *               - IdProducto
 *               - Cantidad
 *     responses:
 *       200:
 *         description: Detalle de venta actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleVenta'
 *       404:
 *         description: Detalle de venta no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/detalleVenta/{id}:
 *   delete:
 *     summary: Elimina un detalle de venta por ID
 *     description: Elimina un detalle de venta específico basado en el ID.
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de venta
 *     responses:
 *       200:
 *         description: Detalle de venta eliminado correctamente
 *       404:
 *         description: Detalle de venta no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/detalleVenta/search/{q}:
 *   get:
 *     summary: Busca detalles de ventas por cadena
 *     description: Busca detalles de ventas que coincidan con una cadena de búsqueda en cualquier columna.
 *     tags: [DetalleVenta]
 *     parameters:
 *       - in: path
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Cadena de búsqueda
 *     responses:
 *       200:
 *         description: Lista de detalles de ventas que coinciden con la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleVenta'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/downloadDetalleVenta:
 *   get:
 *     summary: Genera un archivo Excel de todos los detalles de ventas
 *     description: Genera un archivo Excel con los detalles de ventas para descargar.
 *     tags: [DetalleVenta]
 *     responses:
 *       200:
 *         description: Archivo Excel generado
 *       500:
 *         description: Error del servidor
 */


import express from 'express';
import DetalleVentaController from '../../controllers/detalleVenta/detalleVentaController.js';
//import { update } from '../../models/detalleVenta/detalleVentaModel.js';

const router = express.Router();

router.get('/detalleVenta', DetalleVentaController.getAllDetalleVentas);
router.get('/detalleVenta/:id', DetalleVentaController.getDetalleVentaById);
router.post('/detalleVenta', DetalleVentaController.createDetalleVenta);
router.put('/detalleVenta/:id', DetalleVentaController.updateDetalleVenta);
router.delete('/detalleVenta/:id', DetalleVentaController.deleteDetalleVenta);
router.get('/detalleVenta/search/:q', DetalleVentaController.searchAllColumnsDetalleVentas);

// Archivo Excel
router.get('/downloadDetalleVenta', DetalleVentaController.downloadDetalleVentasExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadDetalleVenta

export default router;
