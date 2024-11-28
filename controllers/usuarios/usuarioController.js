import Usuario from '../../models/usuarios/usuarioModel.js';
import cloudinary from '../../config/cloudinaryConfig.js';
import excel from 'xlsx';

class UsuarioController {
    // Obtener todos los usuarios
    static async getAllUsuarios(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: usuarios });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener un usuario por su ID
    static async getUsuarioById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return res.status(404).json({ code: 404, message: 'Usuario no encontrado.', data: null });
            }

            return res.status(200).json({ code: 200, message: 'Usuario encontrado', data: usuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Registro de usuario
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ code: 400, message: 'Todos los campos son obligatorios.', data: null });
            }

            const usuario = await Usuario.register(req.body);
            return res.status(201).json({ code: 201, message: 'Usuario registrado exitosamente.', data: usuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Iniciar sesión
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ code: 400, message: 'Email y contraseña son obligatorios.', data: null });
            }

            const usuario = await Usuario.login(email, password);

            if (!usuario) {
                return res.status(401).json({ code: 401, message: 'Credenciales incorrectas.', data: null });
            }

            return res.status(200).json({ code: 200, message: 'Inicio de sesión exitoso.', data: usuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Subir imagen de perfil
    static async uploadProfileImage(req, res) {
        try {
            const { id } = req.params;
            const { file } = req;

            if (!file) {
                return res.status(400).json({ code: 400, message: 'No se ha proporcionado una imagen.', data: null });
            }

            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: 'usuarios',
                public_id: `usuario_${id}`,
                overwrite: true,
            });

            const updatedUsuario = await Usuario.updateImage(id, uploadResult.secure_url);

            return res.status(200).json({
                code: 200,
                message: 'Imagen de perfil actualizada exitosamente.',
                data: updatedUsuario,
            });
        } catch (error) {
            console.error('Error al subir imagen:', error);
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar usuarios en todas las columnas
    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const usuarios = await Usuario.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: usuarios });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar usuario
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;

            const updatedUsuario = await Usuario.update(id, { email, password });

            if (!updatedUsuario) {
                return res.status(404).json({ code: 404, message: 'Usuario no encontrado para actualizar.', data: null });
            }

            return res.status(200).json({ code: 200, message: 'Usuario actualizado exitosamente.', data: updatedUsuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar usuario
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedUsuario = await Usuario.delete(id);

            if (!deletedUsuario) {
                return res.status(404).json({ code: 404, message: 'Usuario no encontrado para eliminar.', data: null });
            }

            return res.status(200).json({ code: 200, message: 'Usuario eliminado exitosamente.', data: deletedUsuario });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Generar y descargar un archivo Excel con la lista de usuarios
    static async downloadUsuariosExcel(req, res) {
        try {
            const usuarios = await Usuario.generarExcel();

            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(usuarios);
            excel.utils.book_append_sheet(workbook, worksheet, 'usuarios');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

export default UsuarioController;
