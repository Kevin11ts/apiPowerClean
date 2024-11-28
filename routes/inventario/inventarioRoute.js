/**
 * @swagger
 * components:
 *   schemas:
 *     Inventario:
 *       type: object
 *       required:
 *         - IdInventario
 *         - Cantidad
 *         - IdProducto
 *         - NombreProducto
 *         - created_at
 *       properties:
 *         IdInventario:
 *           type: integer
 *           description: ID del inventario (clave primaria)
 *         Cantidad:
 *           type: integer
 *           description: Cantidad de productos en inventario
 *         IdProducto:
 *           type: integer
 *           description: ID del producto relacionado (clave foránea)
 *         NombreProducto:
 *           type: string
 *           description: Nombre del producto
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del inventario
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del inventario
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del inventario (cuando se marca como eliminado)
 *       example:
 *         IdInventario: 1
 *         Cantidad: 50
 *         IdProducto: 101
 *         NombreProducto: "Producto A"
 *         created_at: "2024-01-01T12:00:00Z"
 *         update_at: "2024-01-02T12:00:00Z"
 *         delete_at: null
 */

/**
 * @swagger
 * /api/inventario:
 *   get:
 *     summary: Obtiene todos los inventarios
 *     description: Lista todos los inventarios que no están marcados como eliminados.
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: Lista de inventarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventario'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/inventario/{id}:
 *   get:
 *     summary: Obtiene un inventario por ID
 *     description: Obtiene un inventario específico basado en su ID.
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del inventario
 *     responses:
 *       200:
 *         description: Inventario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventario'
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/inventario:
 *   post:
 *     summary: Crea un nuevo inventario
 *     description: Crea un nuevo inventario en la base de datos.
 *     tags: [Inventario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventario'
 *     responses:
 *       201:
 *         description: Inventario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventario'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/inventario/{id}:
 *   put:
 *     summary: Actualiza un inventario por ID
 *     description: Actualiza los datos de un inventario específico.
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventario'
 *     responses:
 *       200:
 *         description: Inventario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventario'
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/inventario/{id}:
 *   delete:
 *     summary: Elimina un inventario por ID
 *     description: Marca un inventario como eliminado en la base de datos.
 *     tags: [Inventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del inventario
 *     responses:
 *       200:
 *         description: Inventario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventario'
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/inventario/search/{q}:
 *   get:
 *     summary: Busca inventarios en todas las columnas
 *     description: Busca inventarios usando una cadena de búsqueda que coincide con varias columnas.
 *     tags: [Inventario]
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
 *                 $ref: '#/components/schemas/Inventario'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/downloadInventario:
 *   get:
 *     summary: Descarga un archivo Excel con la lista de inventarios
 *     description: Genera y descarga un archivo Excel con información de los inventarios.
 *     tags: [Inventario]
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
import InventarioController from '../../controllers/inventarios/inventarioController.js';
//import { update } from '../../models/inventario/inventarioModel.js';

const router = express.Router();

router.get('/inventario', InventarioController.getAllInventario);
router.get('/inventario/:id', InventarioController.getInventarioById);
router.post('/inventario', InventarioController.createInventario);
router.put('/inventario/:id', InventarioController.updateInventario);
router.delete('/inventario/:id', InventarioController.deleteInventario);
router.get('/inventario/search/:q', InventarioController.searchAllColumns);

// Archivo Excel
router.get('/downloadInventario', InventarioController.downloadInventariosExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadInventario

export default router;
