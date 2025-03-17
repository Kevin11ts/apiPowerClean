import Producto from '../../models/productos/productoModel.js';
import cloudinary from '../../config/cloudinaryConfig.js';
import fs from 'fs';
import path from 'path';
import excel from 'xlsx';

class ProductoController {

    // Obtener todos los productos
    static async getAllProductos(req, res) {
        try {
            const productos = await Producto.findAll();
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: productos });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Buscar productos en todas las columnas usando una cadena de búsqueda
    static async searchAllColumns(req, res) {
        try {
            const searchString = req.params.q;
            if (!searchString) {
                return res.status(400).json({ code: 400, message: "El parámetro 'q' es obligatorio", data: null });
            }
            const productos = await Producto.searchAllColumns(searchString);
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: productos });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Crear un nuevo producto
    static async createProducto(req, res) {
        try {
            const file = req.file;
            let image_url = null;

            if (file) {
                const localPath = path.join('uploads/productos', file.filename);

                // Subir la imagen a Cloudinary
                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    folder: 'productos',
                    public_id: `producto_${Date.now()}`,
                    overwrite: true,
                });

                image_url = uploadResult.secure_url;

                // Mover el archivo subido a la carpeta local de productos
                fs.renameSync(file.path, localPath);
            }

            const producto = await Producto.create({ ...req.body, image_url });
            return res.status(201).json({ code: 201, message: "Producto creado exitosamente", data: producto });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Obtener un producto por su ID
    static async getProductoById(req, res) {
        try {
            const producto = await Producto.findById(req.params.id);
            if (!producto) {
                return res.status(404).json({ code: 404, message: "Producto no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Operación exitosa", data: producto });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Actualizar un producto por su ID
    static async updateProducto(req, res) {
        try {
            const { id } = req.params;
            const file = req.file;
            let image_url = null;

            if (file) {
                const localPath = path.join('uploads/productos', file.filename);

                // Subir la nueva imagen a Cloudinary
                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    folder: 'productos',
                    public_id: `producto_${id}`,
                    overwrite: true,
                });

                image_url = uploadResult.secure_url;

                // Mover el archivo subido a la carpeta local de productos
                fs.renameSync(file.path, localPath);
            }

            const producto = await Producto.update(id, { ...req.body, image_url });
            if (!producto) {
                return res.status(404).json({ code: 404, message: "Producto no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Producto actualizado exitosamente", data: producto });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Eliminar (soft delete) un producto por su ID
    static async deleteProducto(req, res) {
        try {
            const producto = await Producto.delete(req.params.id);
            if (!producto) {
                return res.status(404).json({ code: 404, message: "Producto no encontrado", data: null });
            }
            return res.status(200).json({ code: 200, message: "Producto eliminado exitosamente", data: null });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message, data: null });
        }
    }

    // Generar y descargar un archivo Excel con la lista de productos
    static async downloadProductosExcel(req, res) {
        try {
            const productos = await Producto.generarExcel();

            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(productos);
            excel.utils.book_append_sheet(workbook, worksheet, 'productos');

            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            return res.status(500).json({ code: 500, message: 'Error al generar el archivo Excel.', data: null });
        }
    }
}

export default ProductoController;
