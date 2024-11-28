/**
 * @swagger
 * components:
 *   schemas:
 *     Venta:
 *       type: object
 *       required:
 *         - Total
 *         - FechaVenta
 *         - IdCliente
 *         - IdEmpleado
 *       properties:
 *         FolioVenta:
 *           type: integer
 *           description: ID único de la venta (clave primaria)
 *         Total:
 *           type: number
 *           description: Monto total de la venta
 *         FechaVenta:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la venta
 *         IdCliente:
 *           type: integer
 *           description: ID del cliente que realizó la venta
 *         IdEmpleado:
 *           type: integer
 *           description: ID del empleado que realizó la venta
 *       example:
 *         FolioVenta: 1
 *         Total: 200.50
 *         FechaVenta: "2024-11-11T12:00:00Z"
 *         IdCliente: 3
 *         IdEmpleado: 2
 */

/**
 * @swagger
 * /api/ventas/venta:
 *   get:
 *     summary: Obtiene todas las ventas
 *     description: Lista todas las ventas registradas en la base de datos.
 *     tags: [Venta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ventas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/ventas/venta/{id}:
 *   get:
 *     summary: Obtiene una venta por FolioVenta
 *     description: Devuelve los detalles de una venta específica usando el FolioVenta.
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: FolioVenta de la venta
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Venta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/ventas/venta:
 *   post:
 *     summary: Crea una nueva venta
 *     description: Registra una nueva venta en la base de datos.
 *     tags: [Venta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Venta creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/ventas/venta/{id}:
 *   put:
 *     summary: Actualiza una venta por FolioVenta
 *     description: Actualiza los detalles de una venta existente.
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: FolioVenta de la venta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venta'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Venta actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venta'
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/ventas/venta/{id}:
 *   delete:
 *     summary: Elimina una venta por FolioVenta
 *     description: Elimina una venta específica usando el FolioVenta.
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: FolioVenta de la venta a eliminar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Venta eliminada correctamente
 *       404:
 *         description: Venta no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/ventas/venta/search/{q}:
 *   get:
 *     summary: Busca ventas por un término de búsqueda
 *     description: Realiza una búsqueda de ventas usando un término de búsqueda.
 *     tags: [Venta]
 *     parameters:
 *       - in: path
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Cadena de búsqueda para filtrar las ventas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venta'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/ventas/downloadVentas:
 *   get:
 *     summary: Descarga un archivo Excel con las ventas
 *     description: Genera y descarga un archivo Excel con la lista de ventas.
 *     tags: [Venta]
 *     security:
 *       - bearerAuth: []
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
import VentaController from '../../controllers/ventas/ventaController.js';
//import { update } from '../../models/ventas/ventaModel.js';

const router = express.Router();

router.get('/venta', VentaController.getAllVentas);
router.get('/venta/:id', VentaController.getVentaById);
router.post('/venta', VentaController.createVenta);
router.put('/venta/:id', VentaController.updateVenta);
router.delete('/venta/:id', VentaController.deleteVenta);
router.get('/venta/search/:q', VentaController.searchAllColumnsVentas);

// Nueva ruta para descargar el archivo Excel
router.get('/downloadVenta', VentaController.downloadVentasExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadVenta

export default router;
