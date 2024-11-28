import { expect } from 'chai';
import sinon from 'sinon';
import VentaController from '../controllers/ventas/ventaController.js';
import Venta from '../models/ventas/ventaModel.js';
import excel from 'xlsx';

describe('Pruebas del controlador de ventas', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Método GET: Obtiene todas las ventas', () => {
        it('Debería obtener todas las ventas exitosamente', async () => {
            const mockVentas = [
                { id: 1, folioVenta: 'V001', total: 100 },
                { id: 2, folioVenta: 'V002', total: 200 }
            ];
            sinon.stub(Venta, 'findAll').resolves(mockVentas);

            const req = { headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.getAllVentas(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockVentas
            })).to.be.true;
        });

        it('Debería manejar errores al obtener las ventas', async () => {
            sinon.stub(Venta, 'findAll').rejects(new Error('Error de base de datos'));

            const req = { headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.getAllVentas(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Buscar ventas por todos los parámetros', () => {
        it('Debería buscar ventas exitosamente', async () => {
            const searchString = 'V001';
            const mockVentas = [{ id: 1, folioVenta: 'V001', total: 100 }];
            sinon.stub(Venta, 'searchAllColumns').resolves(mockVentas);

            const req = { params: { q: searchString }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.searchAllColumnsVentas(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockVentas
            })).to.be.true;
        });

        it('Debería devolver un error si el parámetro "q" es obligatorio', async () => {
            const req = { params: {}, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.searchAllColumnsVentas(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({
                code: 400,
                message: "El parámetro 'q' es obligatorio",
                data: null
            })).to.be.true;
        });
    });

    describe('Método POST: Crea una nueva venta', () => {
        it('Debería crear una venta exitosamente', async () => {
            const nuevaVenta = { id: 1, folioVenta: 'V003', total: 300 };
            sinon.stub(Venta, 'create').resolves(nuevaVenta);

            const req = { body: { folioVenta: 'V003', total: 300 }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.createVenta(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                code: 201,
                message: 'Venta creada exitosamente',
                data: nuevaVenta
            })).to.be.true;
        });

        it('Debería manejar errores al crear una venta', async () => {
            sinon.stub(Venta, 'create').rejects(new Error('Error al crear la venta'));

            const req = { body: { folioVenta: 'V003', total: 300 }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.createVenta(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al crear la venta',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Obtiene una venta por ID (FolioVenta)', () => {
        it('Debería obtener una venta por ID exitosamente', async () => {
            const mockVenta = { id: 1, folioVenta: 'V001', total: 100 };
            sinon.stub(Venta, 'findById').resolves(mockVenta);

            const req = { params: { id: '1' }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.getVentaById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockVenta
            })).to.be.true;
        });

        it('Debería devolver un error 404 si la venta no existe', async () => {
            sinon.stub(Venta, 'findById').resolves(null);

            const req = { params: { id: '999' }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.getVentaById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Operación de venta no encontrada',
                data: null
            })).to.be.true;
        });
    });

    describe('Método PUT: Actualiza una venta', () => {
        it('Debería actualizar una venta exitosamente', async () => {
            const ventaActualizada = { id: 1, folioVenta: 'V001', total: 150 };
            sinon.stub(Venta, 'update').resolves(ventaActualizada);

            const req = { params: { id: '1' }, body: { total: 150 }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.updateVenta(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Venta actualizada exitosamente',
                data: ventaActualizada
            })).to.be.true;
        });

        it('Debería devolver un error 404 si la venta no existe', async () => {
            sinon.stub(Venta, 'update').resolves(null);

            const req = { params: { id: '999' }, body: { total: 150 }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.updateVenta(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Operación de venta no encontrada',
                data: null
            })).to.be.true;
        });
    });

    describe('Método DELETE: Elimina una venta', () => {
        it('Debería eliminar una venta exitosamente', async () => {
            const ventaEliminada = { id: 1, folioVenta: 'V001', total: 100 };
            sinon.stub(Venta, 'delete').resolves(ventaEliminada);

            const req = { params: { id: '1' }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.deleteVenta(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Venta eliminada exitosamente',
                data: null
            })).to.be.true;
        });

        it('Debería devolver un error 404 si la venta no existe', async () => {
            sinon.stub(Venta, 'delete').resolves(false);

            const req = { params: { id: '999' }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await VentaController.deleteVenta(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Operación de venta no encontrada',
                data: null
            })).to.be.true;
        });
    });
});
