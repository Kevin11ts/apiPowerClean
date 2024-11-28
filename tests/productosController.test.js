import { expect } from 'chai';
import sinon from 'sinon';
import ProductoController from '../controllers/productos/productoController.js';
import Producto from '../models/productos/productoModel.js';

describe('Pruebas del controlador de productos', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Método GET: Obtiene todos los productos', () => {
        it('Debería obtener todos los productos exitosamente', async () => {
            const mockProductos = [
                { id: 1, nombre: 'Producto A', precio: 100 },
                { id: 2, nombre: 'Producto B', precio: 200 }
            ];
            sinon.stub(Producto, 'findAll').resolves(mockProductos);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ProductoController.getAllProductos(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockProductos
            })).to.be.true;
        });

        it('Debería manejar errores al obtener los productos', async () => {
            sinon.stub(Producto, 'findAll').rejects(new Error('Error de base de datos'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ProductoController.getAllProductos(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método POST: Crea un producto', () => {
        it('Debería crear un producto exitosamente', async () => {
            const nuevoProducto = { nombre: 'Producto C', precio: 300 };
            const creadoProducto = { id: 3, ...nuevoProducto };

            sinon.stub(Producto, 'create').resolves(creadoProducto);

            const req = { body: nuevoProducto };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ProductoController.createProducto(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                code: 201,
                message: 'Producto creado exitosamente',
                data: creadoProducto
            })).to.be.true;
        });

        it('Debería manejar errores al crear un producto', async () => {
            sinon.stub(Producto, 'create').rejects(new Error('Error al crear el producto'));

            const req = { body: { nombre: 'Producto D', precio: 400 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ProductoController.createProducto(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al crear el producto',
                data: null
            })).to.be.true;
        });
    });

    describe('Método DELETE: Elimina un producto', () => {
        it('Debería eliminar un producto exitosamente', async () => {
            sinon.stub(Producto, 'delete').resolves(true);

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ProductoController.deleteProducto(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Producto eliminado exitosamente',
                data: null
            })).to.be.true;
        });

        it('Debería retornar error 404 si no se encuentra el producto', async () => {
            sinon.stub(Producto, 'delete').resolves(false);

            const req = { params: { id: 999 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ProductoController.deleteProducto(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Producto no encontrado',
                data: null
            })).to.be.true;
        });

        it('Debería manejar errores al eliminar un producto', async () => {
            sinon.stub(Producto, 'delete').rejects(new Error('Error al eliminar el producto'));

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ProductoController.deleteProducto(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al eliminar el producto',
                data: null
            })).to.be.true;
        });
    });

});
