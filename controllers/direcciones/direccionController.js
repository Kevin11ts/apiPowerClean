import Direccion from '../../models/direcciones/direccionModel.js';
import excel from 'xlsx';

class DireccionController {
    static async getAllDireccion(req, res) {
        try {
            const direcciones = await Direccion.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: direcciones });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const direcciones = await Direccion.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: direcciones });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async createDireccion(req, res) {
        try {
            const direccion = await Direccion.create(req.body);
            return res.status(201).json({ code: 201, message: "Dirección creada exitosamente", data: direccion });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async getDireccionById(req, res) {
        try {
            const direccion = await Direccion.findById(req.params.id);
            if (!direccion) {
                return res.status(404).json({ code: 404, message: "Dirección no encontrada", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: direccion });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async updateDireccion(req, res) {
        try {
            const direccion = await Direccion.update(req.params.id, req.body);
            if (!direccion) {
                return res.status(404).json({ code: 404, message: "Dirección no encontrada", data: null });
            }
            return res.status(200).json({ code: 200, message: "Dirección actualizada exitosamente", data: direccion });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async deleteDireccion(req, res) {
        try {
            const direccion = await Direccion.delete(req.params.id);
            if (!direccion) {
                return res.status(404).json({ code: 404, message: "Dirección no encontrada", data: null });
            }
            return res.status(200).json({ code: 200, message: "Dirección eliminada exitosamente", data: direccion });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    static async downloadDireccionesExcel(req, res) {
        try {
            const direcciones = await Direccion.generarExcel();
            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(direcciones);
            excel.utils.book_append_sheet(workbook, worksheet, 'Direcciones');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });
            res.setHeader('Content-Disposition', 'attachment; filename=direcciones.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

export default DireccionController;