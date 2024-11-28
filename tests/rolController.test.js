import { expect } from 'chai';
import sinon from 'sinon';
import RolController from '../controllers/roles/rolController.js';
import Rol from '../models/roles/rolModel.js';

describe('Pruebas del controlador de roles', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Método GET: Obtiene todos los roles', () => {
        it('Debería obtener todos los roles exitosamente', async () => {
            const mockRoles = [
                { id: 1, nombre: 'Admin' },
                { id: 2, nombre: 'Usuario' }
            ];
            sinon.stub(Rol, 'findAll').resolves(mockRoles);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.getAllRol(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockRoles
            })).to.be.true;
        });

        it('Debería manejar errores al obtener los roles', async () => {
            sinon.stub(Rol, 'findAll').rejects(new Error('Error de base de datos'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.getAllRol(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Obtiene todos los roles por un identificador', () => {
        it('Debería obtener un rol por ID exitosamente', async () => {
            const mockRol = { id: 1, nombre: 'Admin' };
            sinon.stub(Rol, 'findById').resolves(mockRol);

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.getRolById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockRol
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el rol no existe', async () => {
            sinon.stub(Rol, 'findById').resolves(null);

            const req = { params: { id: 999 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.getRolById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Rol no encontrado',
                data: null
            })).to.be.true;
        });

        it('Debería manejar errores al buscar un rol por ID', async () => {
            sinon.stub(Rol, 'findById').rejects(new Error('Error de base de datos'));

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.getRolById(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método POST: Crea un nuevo rol', () => {
        it('Debería crear un rol exitosamente', async () => {
            const nuevoRol = { nombre: 'Editor' };
            const mockRolCreado = { id: 3, ...nuevoRol };

            sinon.stub(Rol, 'create').resolves(mockRolCreado);

            const req = { body: nuevoRol };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.createRol(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                code: 201,
                message: 'Rol creado exitosamente',
                data: mockRolCreado
            })).to.be.true;
        });

        it('Debería manejar errores al crear un rol', async () => {
            sinon.stub(Rol, 'create').rejects(new Error('Error al crear el rol'));

            const req = { body: { nombre: 'Editor' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.createRol(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al crear el rol',
                data: null
            })).to.be.true;
        });
    });

    describe('Método DELETE: Elimina un rol', () => {
        it('Debería eliminar un rol exitosamente', async () => {
            sinon.stub(Rol, 'delete').resolves(true);

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.deleteRol(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Rol eliminado exitosamente',
                data: null
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el rol no existe', async () => {
            sinon.stub(Rol, 'delete').resolves(false);

            const req = { params: { id: 999 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.deleteRol(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Rol no encontrado',
                data: null
            })).to.be.true;
        });

        it('Debería manejar errores al eliminar un rol', async () => {
            sinon.stub(Rol, 'delete').rejects(new Error('Error al eliminar el rol'));

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await RolController.deleteRol(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al eliminar el rol',
                data: null
            })).to.be.true;
        });
    });
});
