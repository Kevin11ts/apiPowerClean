/**
 * @swagger
 * components:
 *   schemas:
 *     Direccion:
 *       type: object
 *       required:
 *         - IdUsuario
 *         - Calle
 *         - Colonia
 *         - Ciudad
 *         - CodigoPostal
 *       properties:
 *         IdDireccion:
 *           type: integer
 *           description: ID de la dirección (clave primaria)
 *         IdUsuario:
 *           type: integer
 *           description: ID del usuario relacionado (clave foránea)
 *         Calle:
 *           type: string
 *           description: Nombre de la calle
 *         Avenida:
 *           type: string
 *           description: Nombre de la avenida (opcional)
 *         Colonia:
 *           type: string
 *           description: Nombre de la colonia
 *         Ciudad:
 *           type: string
 *           description: Nombre de la ciudad
 *         CodigoPostal:
 *           type: string
 *           description: Código postal
 *         NumeroExterior:
 *           type: string
 *           description: Número exterior (opcional)
 *         NumeroInterior:
 *           type: string
 *           description: Número interior (opcional)
 *         Referencias:
 *           type: string
 *           description: Referencias adicionales (opcional)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la dirección
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la dirección
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación de la dirección (cuando se marca como eliminada)
 *       example:
 *         IdDireccion: 1
 *         IdUsuario: 1
 *         Calle: "Calle 1"
 *         Avenida: "Avenida 1"
 *         Colonia: "Colonia 1"
 *         Ciudad: "Ciudad 1"
 *         CodigoPostal: "12345"
 *         NumeroExterior: "123"
 *         NumeroInterior: "A"
 *         Referencias: "Cerca del parque"
 *         created_at: "2024-01-01T12:00:00Z"
 *         updated_at: "2024-01-02T12:00:00Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/direccion:
 *   get:
 *     summary: Obtiene todas las direcciones
 *     description: Lista todas las direcciones que no están marcadas como eliminadas.
 *     tags: [Direccion]
 *     responses:
 *       200:
 *         description: Lista de direcciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Direccion'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/direccion/{id}:
 *   get:
 *     summary: Obtiene una dirección por ID
 *     description: Obtiene una dirección específica basada en su ID.
 *     tags: [Direccion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dirección
 *     responses:
 *       200:
 *         description: Dirección encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Direccion'
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/direccion:
 *   post:
 *     summary: Crea una nueva dirección
 *     description: Crea una nueva dirección en la base de datos.
 *     tags: [Direccion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Direccion'
 *     responses:
 *       201:
 *         description: Dirección creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Direccion'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/direccion/{id}:
 *   put:
 *     summary: Actualiza una dirección por ID
 *     description: Actualiza los datos de una dirección específica.
 *     tags: [Direccion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dirección
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Direccion'
 *     responses:
 *       200:
 *         description: Dirección actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Direccion'
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/direccion/{id}:
 *   delete:
 *     summary: Elimina una dirección por ID
 *     description: Marca una dirección como eliminada en la base de datos.
 *     tags: [Direccion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la dirección
 *     responses:
 *       200:
 *         description: Dirección eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Direccion'
 *       404:
 *         description: Dirección no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/direccion/search/{q}:
 *   get:
 *     summary: Busca direcciones en todas las columnas
 *     description: Busca direcciones usando una cadena de búsqueda que coincide con varias columnas.
 *     tags: [Direccion]
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
 *                 $ref: '#/components/schemas/Direccion'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/downloadDireccion:
 *   get:
 *     summary: Descarga un archivo Excel con la lista de direcciones
 *     description: Genera y descarga un archivo Excel con información de las direcciones.
 *     tags: [Direccion]
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
import DireccionController from '../../controllers/direcciones/direccionController.js';

const router = express.Router();

router.get('/direccion', DireccionController.getAllDireccion);
router.get('/direccion/:id', DireccionController.getDireccionById);
router.post('/direccion', DireccionController.createDireccion);
router.put('/direccion/:id', DireccionController.updateDireccion);
router.delete('/direccion/:id', DireccionController.deleteDireccion);
router.get('/direccion/search/:q', DireccionController.searchAllColumns);
router.get('/downloadDireccion', DireccionController.downloadDireccionesExcel);

export default router;