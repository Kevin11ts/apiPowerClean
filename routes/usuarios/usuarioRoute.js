/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         IdUsuario:
 *           type: integer
 *           description: ID único del usuario (clave primaria)
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización del usuario
 *       example:
 *         name: "Juan Pérez"
 *         email: "usuario@example.com"
 *         password: "securepassword123"
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Lista todos los usuarios en la base de datos.
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Devuelve un usuario específico basado en su ID.
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     description: Actualiza los detalles de un usuario específico.
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     description: Elimina un usuario de la base de datos por su ID.
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/usuarios/search/{q}:
 *   get:
 *     summary: Busca usuarios en todas las columnas
 *     description: Realiza una búsqueda en todas las columnas de la tabla `usuarios` usando una cadena de búsqueda.
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Cadena de búsqueda
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/downloadUsuarios:
 *   get:
 *     summary: Descarga un archivo Excel con la lista de usuarios
 *     description: Genera y descarga un archivo Excel con la lista de correos de los usuarios.
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Autenticación de usuario
 *     description: Permite a los usuarios autenticarse con su correo electrónico y contraseña.
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Autenticación exitosa. Devuelve los datos del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */


import express from 'express';
import UsuarioController from '../../controllers/usuarios/usuarioController.js';

const router = express.Router();

// Obtener todos los usuarios
router.get('/usuarios', UsuarioController.getAllUsuarios);

// Obtener un usuario por su ID
router.get('/usuarios/:id', UsuarioController.getUsuarioById);

// Registro de usuario (crear nuevo)
router.post('/usuarios', UsuarioController.register);

// Iniciar sesión
router.post('/login', UsuarioController.login); // Ruta para el login

// Actualizar usuario
router.put('/usuarios/:id', UsuarioController.update);

// Eliminar usuario
router.delete('/usuarios/:id', UsuarioController.delete);

// Buscar usuarios en todas las columnas
router.get('/usuarios/search/:q', UsuarioController.searchAllColumns);

// Ruta para subir imagen de perfil
router.post('/usuarios/:id/upload', UsuarioController.uploadProfileImage);

// Ruta para descargar el archivo Excel
router.get('/downloadUsuarios', UsuarioController.downloadUsuariosExcel);

export default router;
