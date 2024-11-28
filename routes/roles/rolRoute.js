/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       required:
 *         - TipoRol
 *       properties:
 *         IdRol:
 *           type: integer
 *           description: ID único del rol (clave primaria)
 *         TipoRol:
 *           type: string
 *           description: Tipo de rol (por ejemplo, "Administrador", "Usuario")
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del rol
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización del rol
 *         delete_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del rol (soft delete)
 *       example:
 *         IdRol: 1
 *         TipoRol: "Administrador"
 *         created_at: "2024-01-01T12:00:00Z"
 *         updated_at: "2024-01-02T12:00:00Z"
 *         delete_at: null
 */

/**
 * @swagger
 * /api/rol:
 *   get:
 *     summary: Obtiene todos los roles
 *     description: Lista todos los roles que no están marcados como eliminados.
 *     tags: [Rol]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/rol/{id}:
 *   get:
 *     summary: Obtiene un rol por ID
 *     description: Obtiene un rol específico basado en su ID.
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/rol:
 *   post:
 *     summary: Crea un nuevo rol
 *     description: Crea un nuevo rol en la base de datos.
 *     tags: [Rol]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       201:
 *         description: Rol creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/rol/{id}:
 *   put:
 *     summary: Actualiza un rol por ID
 *     description: Actualiza los datos de un rol específico.
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/rol/{id}:
 *   delete:
 *     summary: Elimina un rol por ID
 *     description: Marca un rol como eliminado en la base de datos.
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/rol/search/{q}:
 *   get:
 *     summary: Busca roles en todas las columnas
 *     description: Busca roles usando una cadena de búsqueda que coincide con varias columnas.
 *     tags: [Rol]
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
 *                 $ref: '#/components/schemas/Rol'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/downloadRol:
 *   get:
 *     summary: Descarga un archivo Excel con la lista de roles
 *     description: Genera y descarga un archivo Excel con información de los roles.
 *     tags: [Rol]
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
import RolController from '../../controllers/roles/rolController.js';
//import { update } from '../../models/roles/rolModel.js';

const router = express.Router();

router.get('/rol', RolController.getAllRol);
router.get('/rol/:id', RolController.getRolById);
router.post('/rol', RolController.createRol);
router.put('/rol/:id', RolController.updateRol);
router.delete('/rol/:id', RolController.deleteRol);
router.get('/rol/search/:q', RolController.searchAllColumns);

// Nueva ruta para descargar el archivo Excel
router.get('/downloadRol', RolController.downloadRolsExcel);

// Ejemplo de uso de esta ruta: http://localhost:3000/api/downloadRol

export default router;
