import express from "express";
import {
  obtenerConfiguracion,
  actualizarConfiguracion,
  obtenerConfiguracionInicial,
} from "../../controllers/configuracion/configuracionController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Configuración
 *   description: Endpoints relacionados con la configuración
 */

/**
 * @swagger
 * /configuracion:
 *   get:
 *     summary: Obtiene la configuración actual
 *     tags: [Configuración]
 *     responses:
 *       200:
 *         description: Configuración obtenida correctamente.
 */
router.get("/", obtenerConfiguracion);

/**
 * @swagger
 * /configuracion:
 *   put:
 *     summary: Actualiza la configuración
 *     tags: [Configuración]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               elemento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Configuración actualizada.
 */
router.put("/", actualizarConfiguracion);

/**
 * @swagger
 * /configuracion/inicial:
 *   get:
 *     summary: Obtiene la configuración inicial
 *     tags: [Configuración]
 *     responses:
 *       200:
 *         description: Configuración inicial obtenida correctamente.
 */
router.get("/inicial", obtenerConfiguracionInicial);

export default router;
