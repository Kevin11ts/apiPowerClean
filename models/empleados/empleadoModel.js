import pool from '../../config/db.js';

export default class Empleado {
    // Obtener todos los empleados que no están marcados como eliminados
    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM empleados WHERE delete_at IS NULL');
            return result.rows;
        } catch (error) {
            throw new Error('Error al obtener empleados: ' + error.message);
        }
    }

    // Crear un nuevo empleado
    static async create(data) {
        try {
            const { 
                Nombre, 
                ApellidoPaterno, 
                ApellidoMaterno, 
                FechaNacimiento, 
                Telefono, 
                RFC, 
                NSS, 
                IdUsuario, 
                IdRol 
            } = data;

            if (!Nombre || !ApellidoPaterno || !Telefono || !RFC) {
                throw new Error("Los campos Nombre, ApellidoPaterno, Telefono y RFC son obligatorios");
            }

            const result = await pool.query(
                `INSERT INTO empleados 
                 (Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, RFC, NSS, IdUsuario, IdRol, created_at) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp) 
                 RETURNING *`,
                [Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Telefono, RFC, NSS, IdUsuario, IdRol]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error al crear el empleado: ' + error.message);
        }
    }

    // Obtener un empleado por su ID
    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM empleados WHERE IdEmpleado = $1 AND delete_at IS NULL', [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error al buscar el empleado: ' + error.message);
        }
    }

    // Actualizar un empleado por su ID
    static async update(id, data) {
        try {
            const { 
                Nombre, 
                ApellidoPaterno, 
                ApellidoMaterno, 
                Telefono, 
                RFC, 
                FechaNacimiento, 
                NSS, 
                IdUsuario, 
                IdRol 
            } = data;

            const result = await pool.query(
                `UPDATE empleados 
                 SET Nombre = $1, 
                     ApellidoPaterno = $2, 
                     ApellidoMaterno = $3, 
                     Telefono = $4, 
                     RFC = $5, 
                     FechaNacimiento = $6, 
                     NSS = $7, 
                     IdUsuario = $8, 
                     IdRol = $9, 
                     update_at = current_timestamp 
                 WHERE IdEmpleado = $10 AND delete_at IS NULL 
                 RETURNING *`,
                [Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, RFC, FechaNacimiento, NSS, IdUsuario, IdRol, id]
            );

            return result.rows[0];
        } catch (error) {
            throw new Error('Error al actualizar el empleado: ' + error.message);
        }
    }

    // Eliminar un empleado por su ID
    static async delete(id) {
        try {
            const result = await pool.query(
                'UPDATE empleados SET delete_at = current_timestamp WHERE IdEmpleado = $1 AND delete_at IS NULL RETURNING *',
                [id]
            );

            if (result.rows.length === 0) {
                throw new Error("Empleado no encontrado");
            }

            return result.rows[0];
        } catch (error) {
            throw new Error('Error al eliminar el empleado: ' + error.message);
        }
    }

    // Buscar empleados en todas las columnas usando una cadena de búsqueda
    static async searchAllColumns(searchString) {
        try {
            const result = await pool.query(
                `SELECT * FROM empleados WHERE 
                Nombre ILIKE $1 OR 
                ApellidoPaterno ILIKE $1 OR 
                ApellidoMaterno ILIKE $1 OR 
                CAST(Telefono AS TEXT) ILIKE $1 OR 
                RFC ILIKE $1 OR 
                CAST(FechaNacimiento AS TEXT) ILIKE $1 OR 
                CAST(NSS AS TEXT) ILIKE $1`,
                [`%${searchString}%`]
            );
            return result.rows;
        } catch (error) {
            throw new Error('Error en la búsqueda de empleados: ' + error.message);
        }
    }

    // Generar Excel con la lista de empleados
    static async generarExcel() {
        try {
            const result = await pool.query(
                `SELECT Nombre, ApellidoPaterno, ApellidoMaterno, Telefono, RFC, FechaNacimiento, NSS 
                 FROM empleados 
                 WHERE delete_at IS NULL`
            );
            return result.rows;
        } catch (error) {
            throw new Error('Error al generar el Excel: ' + error.message);
        }
    }
}
