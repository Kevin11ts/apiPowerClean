import { expect } from 'chai';
import sinon from 'sinon';
import DetalleVentaController from '../controllers/detalleVenta/detalleVentaController.js';
import DetalleVenta from '../models/detalleVenta/detalleVentaModel.js';
import excel from 'xlsx';

describe('Pruebas del controlador de detalle de ventas', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Método GET: Obtiene todos los detalles de ventas', () => {
        it('Debería obtener todos los detalles de ventas exitosamente', async () => {
            const mockDetalleVentas = [
                { id: 1, producto: 'Producto 1', cantidad: 10 },
                { id: 2, producto: 'Producto 2', cantidad: 20 }
            ];
            sinon.stub(DetalleVenta, 'findAll').resolves(mockDetalleVentas);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.getAllDetalleVentas(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockDetalleVentas
            })).to.be.true;
        });

        it('Debería manejar errores al obtener los detalles de ventas', async () => {
            sinon.stub(DetalleVenta, 'findAll').rejects(new Error('Error de base de datos'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.getAllDetalleVentas(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Buscar detalles de ventas por todos los parámetros', () => {
        it('Debería buscar detalles de ventas exitosamente', async () => {
            const searchString = 'Producto 1';
            const mockDetalleVentas = [{ id: 1, producto: 'Producto 1', cantidad: 10 }];
            sinon.stub(DetalleVenta, 'searchAllColumns').resolves(mockDetalleVentas);

            const req = { params: { q: searchString } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.searchAllColumnsDetalleVentas(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockDetalleVentas
            })).to.be.true;
        });

        it('Debería devolver un error si el parámetro "q" es obligatorio', async () => {
            const req = { params: {} };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.searchAllColumnsDetalleVentas(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({
                code: 400,
                message: "El parámetro 'q' es obligatorio",
                data: null
            })).to.be.true;
        });
    });

    describe('Método POST: Crea un nuevo detalle de venta', () => {
        it('Debería crear un detalle de venta exitosamente', async () => {
            const nuevoDetalleVenta = { id: 1, producto: 'Producto 1', cantidad: 10 };
            sinon.stub(DetalleVenta, 'create').resolves(nuevoDetalleVenta);

            const req = { body: { producto: 'Producto 1', cantidad: 10 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.createDetalleVenta(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                code: 201,
                message: 'El detalle de venta fue creado exitosamente',
                data: nuevoDetalleVenta
            })).to.be.true;
        });

        it('Debería manejar errores al crear un detalle de venta', async () => {
            sinon.stub(DetalleVenta, 'create').rejects(new Error('Error al crear el detalle de venta'));

            const req = { body: { producto: 'Producto 1', cantidad: 10 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.createDetalleVenta(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al crear el detalle de venta',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Obtiene un detalle de venta por ID', () => {
        it('Debería obtener un detalle de venta por ID exitosamente', async () => {
            const mockDetalleVenta = { id: 1, producto: 'Producto 1', cantidad: 10 };
            sinon.stub(DetalleVenta, 'findById').resolves(mockDetalleVenta);

            const req = { params: { id: '1' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.getDetalleVentaById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockDetalleVenta
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el detalle de venta no existe', async () => {
            sinon.stub(DetalleVenta, 'findById').resolves(null);

            const req = { params: { id: '999' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.getDetalleVentaById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Detalle de venta no encontrado',
                data: null
            })).to.be.true;
        });
    });

    describe('Método PUT: Actualiza un detalle de venta', () => {
        it('Debería actualizar un detalle de venta exitosamente', async () => {
            const detalleVentaActualizado = { id: 1, producto: 'Producto 1', cantidad: 15 };
            sinon.stub(DetalleVenta, 'update').resolves(detalleVentaActualizado);

            const req = { params: { id: '1' }, body: { producto: 'Producto 1', cantidad: 15 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.updateDetalleVenta(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'El Detalle de venta fue actualizado exitosamente',
                data: detalleVentaActualizado
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el detalle de venta no existe', async () => {
            sinon.stub(DetalleVenta, 'update').resolves(null);

            const req = { params: { id: '999' }, body: { producto: 'Producto 1', cantidad: 15 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.updateDetalleVenta(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'El Detalle de venta no fue encontrado',
                data: null
            })).to.be.true;
        });
    });

    describe('Método DELETE: Elimina un detalle de venta', () => {
        it('Debería eliminar un detalle de venta exitosamente', async () => {
            const detalleVentaEliminado = { id: 1, producto: 'Producto 1', cantidad: 10 };
            sinon.stub(DetalleVenta, 'delete').resolves(detalleVentaEliminado);

            const req = { params: { id: '1' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.deleteDetalleVenta(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Detalle de venta eliminado exitosamente',
                data: null
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el detalle de venta no existe', async () => {
            sinon.stub(DetalleVenta, 'delete').resolves(false);

            const req = { params: { id: '999' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.deleteDetalleVenta(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Detalle de venta no encontrado',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Descargar detalle de ventas en Excel', () => {
        it('Debería generar y descargar el archivo Excel exitosamente', async () => {
            const mockDetalleVentas = [
                { id: 1, producto: 'Producto 1', cantidad: 10 },
                { id: 2, producto: 'Producto 2', cantidad: 20 }
            ];
            sinon.stub(DetalleVenta, 'generarExcel').resolves(mockDetalleVentas);
            sinon.stub(excel, 'write').returns(Buffer.from('test'));

            const req = {};
            const res = {
                setHeader: sinon.stub(),
                send: sinon.stub()
            };

            await DetalleVentaController.downloadDetalleVentasExcel(req, res);

            expect(res.setHeader.calledWith('Content-Disposition', 'attachment; filename=detalle_ventas.xlsx')).to.be.true;
            expect(res.setHeader.calledWith('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).to.be.true;
            expect(res.send.calledOnce).to.be.true;
        });

        it('Debería manejar errores al generar el archivo Excel', async () => {
            sinon.stub(DetalleVenta, 'generarExcel').rejects(new Error('Error al generar el archivo Excel'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await DetalleVentaController.downloadDetalleVentasExcel(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al generar el archivo Excel.',
                data: null
            })).to.be.true;
        });
    });
});