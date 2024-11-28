/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - Nombre
 *         - ApellidoPaterno
 *         - ApellidoMaterno
 *         - FechaNacimiento
 *         - Telefono
 *         - IdUsuario
 *       properties:
 *         IdCliente:
 *           type: integer
 *           description: ID único del cliente
 *         Nombre:
 *           type: string
 *           description: Nombre del cliente
 *         ApellidoPaterno:
 *           type: string
 *           description: Apellido paterno del cliente
 *         ApellidoMaterno:
 *           type: string
 *           description: Apellido materno del cliente
 *         FechaNacimiento:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del cliente
 *         Telefono:
 *           type: string
 *           description: Número de teléfono del cliente
 *         IdUsuario:
 *           type: integer
 *           description: ID del usuario asociado al cliente
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del cliente
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del cliente
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación lógica del cliente
 *       example:
 *         IdCliente: 1
 *         Nombre: "Juan"
 *         ApellidoPaterno: "Pérez"
 *         ApellidoMaterno: "García"
 *         FechaNacimiento: "1980-01-01"
 *         Telefono: "555-1234"
 *         IdUsuario: 2
 *         created_at: "2024-01-01T00:00:00Z"
 *         update_at: null
 *         delete_at: null
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre del cliente
 *               ApellidoPaterno:
 *                 type: string
 *                 description: Apellido paterno del cliente
 *               ApellidoMaterno:
 *                 type: string
 *                 description: Apellido materno del cliente
 *               FechaNacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del cliente
 *               Telefono:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *               IdUsuario:
 *                 type: integer
 *                 description: ID del usuario asociado
 *             required:
 *               - Nombre
 *               - ApellidoPaterno
 *               - ApellidoMaterno
 *               - FechaNacimiento
 *               - Telefono
 *               - IdUsuario
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene una lista de todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre del cliente
 *               ApellidoPaterno:
 *                 type: string
 *                 description: Apellido paterno del cliente
 *               ApellidoMaterno:
 *                 type: string
 *                 description: Apellido materno del cliente
 *               FechaNacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del cliente
 *               Telefono:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *               IdUsuario:
 *                 type: integer
 *                 description: ID del usuario asociado
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente (marcado como eliminado)
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */

import express from 'express';
import clienteController from '../../controllers/clientes/clienteController.js'; // Asegúrate de que la ruta del controlador sea correcta

const router = express.Router();

// Rutas para manejar operaciones de clientes
router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/:id', clienteController.getClienteById);
router.post('/clientes', clienteController.createCliente);
router.put('/clientes/:id', clienteController.updateCliente);
router.delete('/clientes/:id', clienteController.deleteCliente);
router.get('/clientes/search/:q', clienteController.searchAllColumns);

// Ruta para descargar el archivo Excel de clientes
router.get('/downloadclientes', clienteController.downloadClientesExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadclientes

export default router;
