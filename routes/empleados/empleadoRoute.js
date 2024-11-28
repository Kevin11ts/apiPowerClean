/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       required:
 *         - IdEmpleado
 *         - Nombre
 *         - ApellidoPaterno
 *         - Telefono
 *         - RFC
 *         - FechaNacimiento
 *         - NSS
 *         - IdUsuario
 *         - IdRol
 *         - created_at
 *       properties:
 *         IdEmpleado:
 *           type: integer
 *           description: ID único del empleado (clave primaria)
 *         Nombre:
 *           type: string
 *           description: Nombre del empleado
 *         ApellidoPaterno:
 *           type: string
 *           description: Apellido paterno del empleado
 *         ApellidoMaterno:
 *           type: string
 *           description: Apellido materno del empleado
 *         Telefono:
 *           type: string
 *           description: Número de teléfono del empleado
 *         RFC:
 *           type: string
 *           description: RFC del empleado
 *         FechaNacimiento:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del empleado
 *         NSS:
 *           type: string
 *           description: Número de seguridad social del empleado
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del registro
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del registro
 *         IdUsuario:
 *           type: integer
 *           description: ID del usuario relacionado
 *         IdRol:
 *           type: integer
 *           description: ID del rol asignado al empleado
 *       example:
 *         IdEmpleado: 1
 *         Nombre: "Juan"
 *         ApellidoPaterno: "Pérez"
 *         ApellidoMaterno: "Gómez"
 *         Telefono: "1234567890"
 *         RFC: "JUAPG123456789"
 *         FechaNacimiento: "1985-06-15"
 *         NSS: "12345678901"
 *         created_at: "2024-01-01T12:00:00Z"
 *         update_at: "2024-01-02T12:00:00Z"
 *         delete_at: null
 *         IdUsuario: 1
 *         IdRol: 2
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtiene todos los empleados
 *     description: Lista todos los empleados que no están marcados como eliminados.
 *     tags: [Empleado]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     description: Obtiene un empleado específico basado en su ID.
 *     tags: [Empleado]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crea un nuevo empleado
 *     description: Crea un nuevo empleado en la base de datos.
 *     tags: [Empleado]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       201:
 *         description: Empleado creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     summary: Actualiza un empleado por ID
 *     description: Actualiza los datos de un empleado específico.
 *     tags: [Empleado]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empleado'
 *     responses:
 *       200:
 *         description: Empleado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     summary: Elimina un empleado por ID
 *     description: Marca un empleado como eliminado en la base de datos.
 *     tags: [Empleado]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/empleados/search/{q}:
 *   get:
 *     summary: Busca empleados en todas las columnas
 *     description: Busca empleados usando una cadena de búsqueda que coincide con varias columnas.
 *     tags: [Empleado]
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
 *                 $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/downloadEmpleados:
 *   get:
 *     summary: Descarga un archivo Excel con la lista de empleados
 *     description: Genera y descarga un archivo Excel con información de los empleados.
 *     tags: [Empleado]
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
import EmpleadoController from '../../controllers/empleados/empleadoController.js';
//import { update } from '../../models/empleados/empleadoModel.js';

const router = express.Router();

router.get('/empleados', EmpleadoController.getAllEmpleados);
router.get('/empleados/:id', EmpleadoController.getEmpleadoById);
router.post('/empleados', EmpleadoController.createEmpleado);
router.put('/empleados/:id', EmpleadoController.updateEmpleado);
router.delete('/empleados/:id', EmpleadoController.deleteEmpleado);
router.get('/empleados/search/:q', EmpleadoController.searchAllColumns);

// Archivo Excel
router.get('/downloadEmpleados', EmpleadoController.downloadEmpleadosExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadEmpleados

export default router;
