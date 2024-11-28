import { expect } from 'chai';
import sinon from 'sinon';
import UsuarioController from '../controllers/usuarios/usuarioController.js';
import Usuario from '../models/usuarios/usuarioModel.js';

describe('Pruebas del controlador de usuarios', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Método GET: Obtiene todos los usuarios', () => {
        it('Debería obtener todos los usuarios exitosamente', async () => {
            const mockUsuarios = [
                { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
                { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com' }
            ];
            sinon.stub(Usuario, 'findAll').resolves(mockUsuarios);

            const req = { headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await UsuarioController.getAllUsuarios(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockUsuarios
            })).to.be.true;
        });

        it('Debería manejar errores al obtener los usuarios', async () => {
            sinon.stub(Usuario, 'findAll').rejects(new Error('Error de base de datos'));

            const req = { headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await UsuarioController.getAllUsuarios(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

   
    describe('Método DELETE: Elimina un usuario', () => {
       
        it('Debería manejar errores al eliminar un usuario', async () => {
            sinon.stub(Usuario, 'delete').rejects(new Error('Error al eliminar el usuario'));

            const req = { params: { id: 1 }, headers: { Authorization: 'powerclean' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await UsuarioController.delete(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al eliminar el usuario',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Genera y descarga un archivo Excel con la lista de usuarios', () => {
        it('Debería generar y descargar el archivo Excel exitosamente', async () => {
            const mockUsuarios = [
                { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
                { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com' }
            ];
            sinon.stub(Usuario, 'generarExcel').resolves(mockUsuarios);

            const req = { headers: { Authorization: 'powerclean' } };
            const res = {
                setHeader: sinon.stub(),
                send: sinon.stub()
            };

            await UsuarioController.downloadUsuariosExcel(req, res);

            expect(res.setHeader.calledWith('Content-Disposition', 'attachment; filename=usuarios.xlsx')).to.be.true;
            expect(res.setHeader.calledWith('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).to.be.true;
            expect(res.send.called).to.be.true;
        });

        
    });
});
