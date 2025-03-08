import express from 'express';
import ConfigInitController from '../../controllers/configuracion/configuracionController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: configInit
 */

/**
 * @swagger
 * /api/configInit:
 *   get:
 *     summary: Retrieve all configuration initializations
 *     tags: [configInit]
 *     responses:
 *       200:
 *         description: List of all configuration initializations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único del documento.
 *                   ledVerde:
 *                     type: string
 *                     description: Estado del LED verde (1 para encendido, 0 para apagado).
 *                   ledAmarillo:
 *                     type: string
 *                     description: Estado del LED amarillo (1 para encendido, 0 para apagado).
 *                   ledRojo:
 *                     type: string
 *                     description: Estado del LED rojo (1 para encendido, 0 para apagado).
 *                   pot1:
 *                     type: string
 *                     description: Valor del potenciómetro 1.
 *                   pot2:
 *                     type: string
 *                     description: Valor del potenciómetro 2.
 *                   buzzer:
 *                     type: string
 *                     description: Estado del buzzer (1 para encendido, 0 para apagado).
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del documento.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de última actualización del documento.
 *                 example:
 *                   _id: "64f1a2b3c8e9f4a3d8e9f4a3"
 *                   ledVerde: "1"
 *                   ledAmarillo: "0"
 *                   ledRojo: "1"
 *                   pot1: "50"
 *                   pot2: "75"
 *                   buzzer: "0"
 *                   createdAt: "2023-09-01T12:34:56.789Z"
 *                   updatedAt: "2023-09-01T12:34:56.789Z"
 *       500:
 *         description: Internal server error
 */
router.get("/configInit", ConfigInitController.getAll);

/**
 * @swagger
 * /api/configInit/{id}:
 *   put:
 *     summary: Actualizar una configuración inicial
 *     tags: [configInit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la configuración a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/configInit'
 *     responses:
 *       200:
 *         description: Configuración actualizada con éxito
 *       400:
 *         description: Solicitud incorrecta, datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.put("/configInit/:id", ConfigInitController.update);

export default router;
