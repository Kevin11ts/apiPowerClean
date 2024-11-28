import { expect } from 'chai';
import sinon from 'sinon';
import ClienteController from '../controllers/clientes/clienteController.js';
import Cliente from '../models/clientes/clienteModel.js';
import excel from 'xlsx';

describe('Pruebas del controlador de clientes', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Método GET: Obtiene todos los clientes', () => {
        it('Debería obtener todos los clientes exitosamente', async () => {
            const mockClientes = [
                { id: 1, nombre: 'Juan', apellido: 'Pérez' },
                { id: 2, nombre: 'Ana', apellido: 'López' }
            ];
            sinon.stub(Cliente, 'findAll').resolves(mockClientes);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.getAllClientes(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockClientes
            })).to.be.true;
        });

        it('Debería manejar errores al obtener los clientes', async () => {
            sinon.stub(Cliente, 'findAll').rejects(new Error('Error de base de datos'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.getAllClientes(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Buscar clientes por todos los parámetros', () => {
        it('Debería buscar clientes exitosamente', async () => {
            const searchString = 'Juan';
            const mockClientes = [{ id: 1, nombre: 'Juan', apellido: 'Pérez' }];
            sinon.stub(Cliente, 'searchAllColumns').resolves(mockClientes);

            const req = { params: { q: searchString } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.searchAllColumns(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockClientes
            })).to.be.true;
        });

        it('Debería devolver un error si el parámetro "q" es obligatorio', async () => {
            const req = { params: {} };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.searchAllColumns(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({
                code: 400,
                message: "El parámetro 'q' es obligatorio",
                data: null
            })).to.be.true;
        });
    });

    describe('Método POST: Crea un nuevo cliente', () => {
        it('Debería crear un cliente exitosamente', async () => {
            const nuevoCliente = { id: 1, nombre: 'Carlos', apellido: 'Sánchez' };
            sinon.stub(Cliente, 'create').resolves(nuevoCliente);

            const req = { body: { nombre: 'Carlos', apellido: 'Sánchez' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.createCliente(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                code: 201,
                message: 'Cliente creado exitosamente',
                data: nuevoCliente
            })).to.be.true;
        });

        it('Debería manejar errores al crear un cliente', async () => {
            sinon.stub(Cliente, 'create').rejects(new Error('Error al crear el cliente'));

            const req = { body: { nombre: 'Carlos', apellido: 'Sánchez' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.createCliente(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al crear el cliente',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Obtiene un cliente por ID', () => {
        it('Debería obtener un cliente por ID exitosamente', async () => {
            const mockCliente = { id: 1, nombre: 'Juan', apellido: 'Pérez' };
            sinon.stub(Cliente, 'findById').resolves(mockCliente);

            const req = { params: { id: '1' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.getClienteById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockCliente
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el cliente no existe', async () => {
            sinon.stub(Cliente, 'findById').resolves(null);

            const req = { params: { id: '999' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.getClienteById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Cliente no encontrado',
                data: null
            })).to.be.true;
        });
    });

    describe('Método PUT: Actualiza un cliente', () => {
        it('Debería actualizar un cliente exitosamente', async () => {
            const clienteActualizado = { id: 1, nombre: 'Juan', apellido: 'Pérez' };
            sinon.stub(Cliente, 'update').resolves(clienteActualizado);

            const req = { params: { id: '1' }, body: { nombre: 'Juan', apellido: 'Pérez' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.updateCliente(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Cliente actualizado exitosamente',
                data: clienteActualizado
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el cliente no existe', async () => {
            sinon.stub(Cliente, 'update').resolves(null);

            const req = { params: { id: '999' }, body: { nombre: 'Juan', apellido: 'Pérez' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.updateCliente(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Cliente no encontrado',
                data: null
            })).to.be.true;
        });
    });

    describe('Método DELETE: Elimina un cliente', () => {
        it('Debería eliminar un cliente exitosamente', async () => {
            const clienteEliminado = { id: 1, nombre: 'Juan', apellido: 'Pérez' };
            sinon.stub(Cliente, 'delete').resolves(clienteEliminado);

            const req = { params: { id: '1' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.deleteCliente(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Cliente eliminado exitosamente',
                data: null
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el cliente no existe', async () => {
            sinon.stub(Cliente, 'delete').resolves(false);

            const req = { params: { id: '999' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.deleteCliente(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Cliente no encontrado',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Descargar clientes en formato Excel', () => {
        it('Debería generar y descargar el archivo Excel exitosamente', async () => {
            const mockClientes = [
                { id: 1, nombre: 'Juan', apellido: 'Pérez' },
                { id: 2, nombre: 'Ana', apellido: 'López' }
            ];
            sinon.stub(Cliente, 'generarExcel').resolves(mockClientes);
            sinon.stub(excel, 'write').returns(Buffer.from('test'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                setHeader: sinon.stub(),
                send: sinon.stub()
            };

            await ClienteController.downloadClientesExcel(req, res);

            expect(res.setHeader.calledWith('Content-Disposition', 'attachment; filename=clientes.xlsx')).to.be.true;
            expect(res.setHeader.calledWith('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).to.be.true;
            expect(res.send.calledOnce).to.be.true;
        });

        it('Debería manejar errores al generar el archivo Excel', async () => {
            sinon.stub(Cliente, 'generarExcel').rejects(new Error('Error al generar el archivo Excel'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await ClienteController.downloadClientesExcel(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al generar el archivo Excel.',
                data: null
            })).to.be.true;
        });
    });
});
