import { expect } from 'chai';
import sinon from 'sinon';
import InventarioController from '../controllers/inventarios/inventarioController.js';
import Inventario from '../models/inventario/inventarioModel.js';

describe('Pruebas del controlador de inventarios', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Método GET: Obtiene todos los inventarios', () => {
        it('Debería obtener todos los inventarios exitosamente', async () => {
            const mockInventarios = [
                { id: 1, nombre: 'Producto 1', cantidad: 10 },
                { id: 2, nombre: 'Producto 2', cantidad: 20 }
            ];
            sinon.stub(Inventario, 'findAll').resolves(mockInventarios);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.getAllInventario(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockInventarios
            })).to.be.true;
        });

        it('Debería manejar errores al obtener los inventarios', async () => {
            sinon.stub(Inventario, 'findAll').rejects(new Error('Error de base de datos'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.getAllInventario(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Buscar inventarios por todos los parámetros', () => {
        it('Debería buscar inventarios exitosamente', async () => {
            const searchString = 'Producto';
            const mockInventarios = [{ id: 1, nombre: 'Producto 1', cantidad: 10 }];
            sinon.stub(Inventario, 'searchAllColumns').resolves(mockInventarios);

            const req = { params: { q: searchString } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.searchAllColumns(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockInventarios
            })).to.be.true;
        });

        it('Debería devolver un error si el parámetro "q" es obligatorio', async () => {
            const req = { params: {} };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.searchAllColumns(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({
                code: 400,
                message: "El parámetro 'q' es obligatorio",
                data: null
            })).to.be.true;
        });
    });

    describe('Método POST: Crea un nuevo inventario', () => {
        it('Debería crear un inventario exitosamente', async () => {
            const nuevoInventario = { id: 1, nombre: 'Producto 1', cantidad: 10 };
            sinon.stub(Inventario, 'create').resolves(nuevoInventario);

            const req = { body: { nombre: 'Producto 1', cantidad: 10 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.createInventario(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                code: 201,
                message: 'Inventario creado exitosamente',
                data: nuevoInventario
            })).to.be.true;
        });

        it('Debería manejar errores al crear un inventario', async () => {
            sinon.stub(Inventario, 'create').rejects(new Error('Error al crear el inventario'));

            const req = { body: { nombre: 'Producto 1', cantidad: 10 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.createInventario(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al crear el inventario',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Obtiene un inventario por ID', () => {
        it('Debería obtener un inventario por ID exitosamente', async () => {
            const mockInventario = { id: 1, nombre: 'Producto 1', cantidad: 10 };
            sinon.stub(Inventario, 'findById').resolves(mockInventario);

            const req = { params: { id: '1' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.getInventarioById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockInventario
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el inventario no existe', async () => {
            sinon.stub(Inventario, 'findById').resolves(null);

            const req = { params: { id: '999' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.getInventarioById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Inventario no encontrado',
                data: null
            })).to.be.true;
        });
    });

    describe('Método PUT: Actualiza un inventario', () => {
        it('Debería actualizar un inventario exitosamente', async () => {
            const inventarioActualizado = { id: 1, nombre: 'Producto 1', cantidad: 15 };
            sinon.stub(Inventario, 'update').resolves(inventarioActualizado);

            const req = { params: { id: '1' }, body: { nombre: 'Producto 1', cantidad: 15 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.updateInventario(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Inventario actualizado exitosamente',
                data: inventarioActualizado
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el inventario no existe', async () => {
            sinon.stub(Inventario, 'update').resolves(null);

            const req = { params: { id: '999' }, body: { nombre: 'Producto 1', cantidad: 15 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.updateInventario(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Inventario no encontrado',
                data: null
            })).to.be.true;
        });
    });

    describe('Método DELETE: Elimina un inventario', () => {
        it('Debería eliminar un inventario exitosamente', async () => {
            const inventarioEliminado = { id: 1, nombre: 'Producto 1', cantidad: 10 };
            sinon.stub(Inventario, 'delete').resolves(inventarioEliminado);

            const req = { params: { id: '1' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.deleteInventario(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Inventario eliminado exitosamente',
                data: inventarioEliminado
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el inventario no existe', async () => {
            sinon.stub(Inventario, 'delete').resolves(false);

            const req = { params: { id: '999' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await InventarioController.deleteInventario(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Inventario no encontrado',
                data: null
            })).to.be.true;
        });
    });

    
});
