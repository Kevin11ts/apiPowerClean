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
      const result = await pool.query(
        `INSERT INTO usuarios (name, email, password, created_at) 
         VALUES ($1, $2, $3, current_timestamp) 
         RETURNING *`,
        [name, email, password]  // La contraseña ya está encriptada
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
      if (user) {
        return user; // Devuelve el usuario para que el controlador compare la contraseña
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
    const { email, password, image_url } = data;
    try {
      // Crear un array de campos a actualizar
      const updates = [];
      const values = [];

      if (email !== undefined) {
        updates.push(`email = $${updates.length + 1}`);
        values.push(email);
      }

      if (password !== undefined) {
        updates.push(`password = $${updates.length + 1}`);
        values.push(password);
      }

      if (image_url !== undefined) {
        updates.push(`image_url = $${updates.length + 1}`);
        values.push(image_url);
      }

      // Si no hay campos para actualizar, retornar null
      if (updates.length === 0) {
        return null;
      }

      // Agregar el ID al final de los valores
      values.push(id);

      // Construir la consulta SQL dinámica
      const query = `
        UPDATE usuarios 
        SET ${updates.join(', ')}, updated_at = current_timestamp
        WHERE IdUsuario = $${values.length}
        RETURNING *
      `;

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
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