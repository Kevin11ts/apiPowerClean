import pool from '../../config/db.js';

export default class Direccion {
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM direcciones WHERE deleted_at IS NULL');
            return result.rows;
        } catch (error) {
            console.error('Error al obtener direcciones:', error);
            throw error;
        }
    }

    static async create(data) {
        const { IdUsuario, Calle, Avenida, Colonia, Ciudad, CodigoPostal, NumeroExterior, NumeroInterior, Referencias } = data;
        try {
            const result = await pool.query(
                'INSERT INTO direcciones (IdUsuario, Calle, Avenida, Colonia, Ciudad, CodigoPostal, NumeroExterior, NumeroInterior, Referencias, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp) RETURNING *',
                [IdUsuario, Calle, Avenida, Colonia, Ciudad, CodigoPostal, NumeroExterior, NumeroInterior, Referencias]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear dirección:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM direcciones WHERE IdDireccion = $1 AND deleted_at IS NULL', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener dirección:', error);
            throw error;
        }
    }

    static async update(id, data) {
        const { Calle, Avenida, Colonia, Ciudad, CodigoPostal, NumeroExterior, NumeroInterior, Referencias } = data;
        try {
            const result = await pool.query(
                'UPDATE direcciones SET Calle = $1, Avenida = $2, Colonia = $3, Ciudad = $4, CodigoPostal = $5, NumeroExterior = $6, NumeroInterior = $7, Referencias = $8, updated_at = current_timestamp WHERE IdDireccion = $9 AND deleted_at IS NULL RETURNING *',
                [Calle, Avenida, Colonia, Ciudad, CodigoPostal, NumeroExterior, NumeroInterior, Referencias, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar dirección:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query(
                'UPDATE direcciones SET deleted_at = current_timestamp WHERE IdDireccion = $1 AND deleted_at IS NULL RETURNING *',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar dirección:', error);
            throw error;
        }
    }

    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM direcciones WHERE 
                Calle ILIKE $1 OR 
                Avenida ILIKE $1 OR 
                Colonia ILIKE $1 OR 
                Ciudad ILIKE $1 OR 
                CodigoPostal ILIKE $1 OR 
                NumeroExterior ILIKE $1 OR 
                NumeroInterior ILIKE $1 OR 
                Referencias ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al buscar direcciones:', error);
            throw error;
        }
    }

    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT IdUsuario, Calle, Avenida, Colonia, Ciudad, CodigoPostal, NumeroExterior, NumeroInterior, Referencias 
                 FROM direcciones 
                 WHERE deleted_at IS NULL`
            );
            return result.rows;
        } catch (error) {
            console.error('Error al generar Excel de direcciones:', error);
            throw error;
        }
    }
}