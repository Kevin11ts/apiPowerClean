import express from "express";
import { recibirDatos, obtenerDatos } from "../../controllers/datos/datosController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Datos
 *   description: Endpoints para el manejo de datos
 */

/**
 * @swagger
 * /datos:
 *   post:
 *     summary: Guarda datos enviados por Arduino
 *     tags: 
 *       - Datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               elemento:
 *                 type: string
 *               valor:
 *                 type: number
 *               unidades:
 *                 type: string
 *     responses:
 *       201:
 *         description: Datos almacenados correctamente.
 */
router.post("/", recibirDatos);

/**
 * @swagger
 * /datos:
 *   get:
 *     summary: Obtiene los datos almacenados
 *     tags: 
 *       - Datos
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 */
router.get("/", obtenerDatos);

export default router;
