import pool from '../../config/db.js';

class Usuario {
    // Obtener todos los usuarios
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM usuarios');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    // Crear un nuevo usuario (registrarse)
    static async register(data) {
        const { name, email, password } = data;
        try {
            // Eliminamos la encriptación de la contraseña
            const result = await pool.query(
                `INSERT INTO usuarios (name, email, password, created_at) 
                 VALUES ($1, $2, $3, current_timestamp) 
                 RETURNING *`,
                [name, email, password]  // Usamos la contraseña tal cual
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    }

    // Iniciar sesión
    static async login(email, password) {
        try {
            const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
            const user = result.rows[0];
            if (user && user.password === password) {  // Comparamos la contraseña tal cual
                return user; // Usuario autenticado
            } else {
                throw new Error('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    }

    // Obtener un usuario por su ID
    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM usuarios WHERE IdUsuario = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw error;
        }
    }

    // Actualizar un usuario
    static async update(id, data) {
        const { email, password } = data;
        try {
            // Eliminamos la encriptación de la contraseña
            const result = await pool.query(
                `UPDATE usuarios 
                 SET email = COALESCE($1, email), 
                     password = COALESCE($2, password), 
                     updated_at = current_timestamp 
                 WHERE IdUsuario = $3 
                 RETURNING *`,
                [email, password, id]  // Usamos la contraseña tal cual
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    // Actualizar imagen de perfil
    static async updateImage(id, imageUrl) {
        try {
            const result = await pool.query(
                'UPDATE usuarios SET image_url = $1, updated_at = current_timestamp WHERE IdUsuario = $2 RETURNING *',
                [imageUrl, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar imagen:', error);
            throw error;
        }
    }

    // Eliminar un usuario
    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM usuarios WHERE IdUsuario = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
        }
    }

    // Buscar usuarios en todas las columnas
    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM usuarios WHERE 
                email ILIKE $1 OR 
                CAST(created_at AS TEXT) ILIKE $1 OR 
                CAST(updated_at AS TEXT) ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
            throw error;
        }
    }

    // Generar Excel con la lista de correos de usuarios
    static async generarExcel() {
        try {
            const result = await pool.query(`SELECT email FROM usuarios`);
            return result.rows;
        } catch (error) {
            console.error('Error al generar Excel:', error);
            throw error;
        }
    }
}

export default Usuario;
