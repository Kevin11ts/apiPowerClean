import { expect } from 'chai';
import sinon from 'sinon';
import TipoProductoController from '../controllers/tipoProducto/tipoProductoController.js';
import TipoProducto from '../models/tipoProducto/tipoProductoModel.js';

describe('Pruebas del controlador de tipos de productos', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('Método GET: Obtiene todos los tipos de productos', () => {
        it('Debería obtener todos los tipos de productos exitosamente', async () => {
            const mockTipoProductos = [
                { id: 1, nombre: 'Electrónica' },
                { id: 2, nombre: 'Ropa' }
            ];
            sinon.stub(TipoProducto, 'findAll').resolves(mockTipoProductos);

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await TipoProductoController.getAllTipoProductos(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockTipoProductos
            })).to.be.true;
        });

        it('Debería manejar errores al obtener los tipos de productos', async () => {
            sinon.stub(TipoProducto, 'findAll').rejects(new Error('Error de base de datos'));

            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await TipoProductoController.getAllTipoProductos(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método GET: Obtiene un tipo de producto por ID', () => {
        it('Debería obtener un tipo de producto por ID exitosamente', async () => {
            const mockTipoProducto = { id: 1, nombre: 'Electrónica' };
            sinon.stub(TipoProducto, 'findById').resolves(mockTipoProducto);

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await TipoProductoController.getTipoProductoById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Operación exitosa',
                data: mockTipoProducto
            })).to.be.true;
        });

        it('Debería devolver un error 404 si el tipo de producto no existe', async () => {
            sinon.stub(TipoProducto, 'findById').resolves(null);

            const req = { params: { id: 999 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await TipoProductoController.getTipoProductoById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Tipo de producto no encontrado',
                data: null
            })).to.be.true;
        });

        it('Debería manejar errores al obtener un tipo de producto por ID', async () => {
            sinon.stub(TipoProducto, 'findById').rejects(new Error('Error de base de datos'));

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await TipoProductoController.getTipoProductoById(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error de base de datos',
                data: null
            })).to.be.true;
        });
    });

    describe('Método POST: Crea un nuevo tipo de producto', () => {
        it('Debería crear un tipo de producto exitosamente', async () => {
            // Mock de la respuesta esperada
            const nuevoTipoProducto = { id: 1, nombre: 'Michelln el de las llantas xd' };
            sinon.stub(TipoProducto, 'create').resolves(nuevoTipoProducto); // Simulamos la creación del tipo de producto
    
            const req = { body: { nombre: 'Electrónica' } }; // El cuerpo de la solicitud
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
    
            await TipoProductoController.createTipoProducto(req, res);
    
            // Verifica que se haya llamado con el código 201 y los datos correctos
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith({
                code: 201,
                message: 'El tipo de producto fue creado exitosamente',
                data: nuevoTipoProducto
            })).to.be.true;
        });
    

        it('Debería manejar errores al crear un tipo de producto', async () => {
            sinon.stub(TipoProducto, 'create').rejects(new Error('Error al crear el tipo de producto'));

            const req = { body: { nombre: 'Electrónica' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await TipoProductoController.createTipoProducto(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al crear el tipo de producto',
                data: null
            })).to.be.true;
        });
    });

    describe('Método DELETE: Elimina un tipo de producto', () => {
        it('Debería eliminar un tipo de producto exitosamente', async () => {
            const tipoProductoEliminado = { id: 1, nombre: 'Producto A' };  // Simulamos el objeto eliminado
            sinon.stub(TipoProducto, 'delete').resolves(tipoProductoEliminado);  // Devuelve el objeto eliminado
        
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };
        
            await TipoProductoController.deleteTipoProducto(req, res);
        
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({
                code: 200,
                message: 'Tipo de producto eliminado exitosamente',
                data: tipoProductoEliminado  // Aseguramos que se devuelva el objeto eliminado
            })).to.be.true;
        });
        
        it('Debería devolver un error 404 si el tipo de producto no existe', async () => {
            sinon.stub(TipoProducto, 'delete').resolves(false);

            const req = { params: { id: 999 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await TipoProductoController.deleteTipoProducto(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                code: 404,
                message: 'Tipo de producto no encontrado',
                data: null
            })).to.be.true;
        });

        it('Debería manejar errores al eliminar un tipo de producto', async () => {
            sinon.stub(TipoProducto, 'delete').rejects(new Error('Error al eliminar el tipo de producto'));

            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            await TipoProductoController.deleteTipoProducto(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                code: 500,
                message: 'Error al eliminar el tipo de producto',
                data: null
            })).to.be.true;
        });
    });
});
