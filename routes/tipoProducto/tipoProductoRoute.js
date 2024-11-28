/**
 * @swagger
 * components:
 *   schemas:
 *     TipoProducto:
 *       type: object
 *       required:
 *         - TipoProducto
 *       properties:
 *         IdTipoProducto:
 *           type: integer
 *           description: ID único del tipo de producto (clave primaria)
 *         TipoProducto:
 *           type: string
 *           description: Nombre del tipo de producto
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del tipo de producto
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización del tipo de producto
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del tipo de producto (soft delete)
 *       example:
 *         TipoProducto: "Productos limpios"
 *         created_at: "2024-01-01T12:00:00Z"
 *         updated_at: null
 *         delete_at: null
 */

/**
 * @swagger
 * /api/tipoProducto:
 *   get:
 *     summary: Obtiene todos los tipos de productos
 *     description: Lista todos los tipos de productos que no están marcados como eliminados.
 *     tags: [TipoProducto]
 *     responses:
 *       200:
 *         description: Lista de tipos de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoProducto'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/tipoProducto/{id}:
 *   get:
 *     summary: Obtiene un tipo de producto por ID
 *     description: Obtiene un tipo de producto específico basado en su ID.
 *     tags: [TipoProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de producto
 *     responses:
 *       200:
 *         description: Tipo de producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoProducto'
 *       404:
 *         description: Tipo de producto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/tipoProducto:
 *   post:
 *     summary: Crea un nuevo tipo de producto
 *     description: Crea un nuevo tipo de producto en la base de datos.
 *     tags: [TipoProducto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoProducto'
 *     responses:
 *       201:
 *         description: Tipo de producto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoProducto'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/tipoProducto/{id}:
 *   put:
 *     summary: Actualiza un tipo de producto por ID
 *     description: Actualiza los datos de un tipo de producto específico.
 *     tags: [TipoProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoProducto'
 *     responses:
 *       200:
 *         description: Tipo de producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoProducto'
 *       404:
 *         description: Tipo de producto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/tipoProducto/{id}:
 *   delete:
 *     summary: Elimina un tipo de producto por ID
 *     description: Marca un tipo de producto como eliminado en la base de datos.
 *     tags: [TipoProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de producto
 *     responses:
 *       200:
 *         description: Tipo de producto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoProducto'
 *       404:
 *         description: Tipo de producto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/tipoProducto/search/{q}:
 *   get:
 *     summary: Busca tipos de productos en todas las columnas
 *     description: Busca tipos de productos usando una cadena de búsqueda que coincide con varias columnas.
 *     tags: [TipoProducto]
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
 *                 $ref: '#/components/schemas/TipoProducto'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/downloadTipoProducto:
 *   get:
 *     summary: Descarga un archivo Excel con la lista de tipos de productos
 *     description: Genera y descarga un archivo Excel con información de los tipos de productos.
 *     tags: [TipoProducto]
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
import TipoProductoController from '../../controllers/tipoProducto/tipoProductoController.js';
//import { update } from '../../models/tipoProducto/tipoProductoModel.js';

const router = express.Router();

router.get('/tipoProducto', TipoProductoController.getAllTipoProductos);
router.get('/tipoProducto/:id', TipoProductoController.getTipoProductoById);
router.post('/tipoProducto', TipoProductoController.createTipoProducto);
router.put('/tipoProducto/:id', TipoProductoController.updateTipoProducto);
router.delete('/tipoProducto/:id', TipoProductoController.deleteTipoProducto);
router.get('/tipoProducto/search/:q', TipoProductoController.searchAllColumns);

// Ruta para descargar el archivo Excel
router.get('/downloadTipoProducto', TipoProductoController.downloadTipoProductosExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadTipoProducto

export default router;
