import pool from '../../config/db.js';

export default class Producto {
    // Lista de todos los productos
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM productos WHERE delete_at IS NULL');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }

    // Crear un nuevo producto
    static async create(data) {
        const { nombre, descripcion, preciomayoreo, preciomenudeo, preciovendedor, idtipoproducto, image_url } = data;
        try {
            const result = await pool.query(
                `INSERT INTO productos (Nombre, Descripcion, PrecioMayoreo, PrecioMenudeo, PrecioVendedor, IdTipoProducto, image_url) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 RETURNING *`,
                [nombre, descripcion, preciomayoreo, preciomenudeo, preciovendedor, idtipoproducto, image_url]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }

    // Obtener un producto por su ID
    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM productos WHERE IdProducto = $1 AND delete_at IS NULL', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener producto:', error);
            throw error;
        }
    }

    // Actualizar un producto
    static async update(id, data) {
        const { nombre, descripcion, preciomayoreo, preciomenudeo, preciovendedor, idtipoproducto, image_url } = data;
        try {
            const result = await pool.query(
                `UPDATE productos 
                 SET Nombre = $1, Descripcion = $2, PrecioMayoreo = $3, PrecioMenudeo = $4, PrecioVendedor = $5, IdTipoProducto = $6, image_url = $7, updated_at = current_timestamp 
                 WHERE IdProducto = $8 AND delete_at IS NULL 
                 RETURNING *`,
                [nombre, descripcion, preciomayoreo, preciomenudeo, preciovendedor, idtipoproducto, image_url, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    // Eliminar un producto (soft delete)
    static async delete(id) {
        try {
            const result = await pool.query(
                'UPDATE productos SET delete_at = current_timestamp WHERE IdProducto = $1 AND delete_at IS NULL RETURNING *',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }

    // Buscar productos en todas las columnas
    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM productos WHERE 
                Nombre ILIKE $1 OR 
                Descripcion ILIKE $1 OR 
                CAST(PrecioMayoreo AS TEXT) ILIKE $1 OR 
                CAST(PrecioMenudeo AS TEXT) ILIKE $1 OR 
                CAST(PrecioVendedor AS TEXT) ILIKE $1 OR 
                CAST(IdTipoProducto AS TEXT) ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar productos:', error);
            throw error;
        }
    }

    // Generar Excel con la lista de productos
    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT Nombre, Descripcion, PrecioMayoreo, PrecioMenudeo, PrecioVendedor, IdTipoProducto 
                 FROM productos 
                 WHERE delete_at IS NULL`
            );
            return result.rows;
        } catch (error) {
            console.error('Error al generar Excel de productos:', error);
            throw error;
        }
    }
}