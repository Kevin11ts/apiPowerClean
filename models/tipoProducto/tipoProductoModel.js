import pool from '../../config/db.js';

class TipoProducto {
    // Obtener todos los tipos de productos
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM tipo_productos');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener tipos de productos:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    // Crear un nuevo tipo de producto
    static async create(data) {
        const { Tipo } = data;
        try {
            const result = await pool.query(
                'INSERT INTO tipo_productos (Tipo) VALUES ($1) RETURNING *',
                [Tipo]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear tipo de producto:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    // Obtener un tipo de producto por su ID
    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM tipo_productos WHERE IdTipoProducto = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener tipo de producto:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    // Actualizar un tipo de producto
    static async update(id, data) {
        const { Tipo } = data;
        try {
            const result = await pool.query(
                'UPDATE tipo_productos SET Tipo = $1 WHERE IdTipoProducto = $2 RETURNING *',
                [Tipo, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar tipo de producto:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    // Eliminar un tipo de producto
    static async delete(id) {
        try {
            const result = await pool.query('DELETE FROM tipo_productos WHERE IdTipoProducto = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar tipo de producto:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    // Buscar tipos de productos en todas las columnas
    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM tipo_productos WHERE 
                Tipo ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar tipos de productos:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    // Generar Excel con la lista de tipos de productos
    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT Tipo FROM tipo_productos`
            );
            return result.rows;
        } catch (error) {
            console.error('Error al generar Excel de tipos de productos:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }
}

export default TipoProducto;
