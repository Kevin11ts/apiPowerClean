import express from 'express';
import DataController from '../../controllers/datos/datosController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: data
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Obtener todos los registros de datos
 *     tags: [data]
 *     responses:
 *       200:
 *         description: Lista de todos los registros de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/data'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/data", DataController.getAll);

/**
 * @swagger
 * /api/data:
 *   post:
 *     summary: Crear un nuevo registro de datos
 *     tags: [data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/data'
 *     responses:
 *       201:
 *         description: Registro de datos creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/data'
 *       400:
 *         description: Solicitud incorrecta, datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/data", DataController.create);

export default router;
