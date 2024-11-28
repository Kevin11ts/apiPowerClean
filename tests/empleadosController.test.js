import { expect } from 'chai';
import sinon from 'sinon';
import EmpleadoController from '../controllers/empleados/empleadoController.js';
import Empleado from '../models/empleados/empleadoModel.js';
import excel from 'xlsx';

describe('Pruebas del controlador de empleados', () => {
  afterEach(() => {
      sinon.restore();
  });

  describe('Método GET: Obtener todos los empleados', () => {
      it('Debería obtener todos los empleados exitosamente', async () => {
          const mockEmpleados = [
              { id: 1, nombre: 'Juan', apellido: 'Pérez' },
              { id: 2, nombre: 'Ana', apellido: 'Gómez' }
          ];
          sinon.stub(Empleado, 'findAll').resolves(mockEmpleados);

          const req = {};
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.getAllEmpleados(req, res);

          expect(res.status.calledWith(200)).to.be.true;
          expect(res.json.calledWith({
              code: 200,
              message: 'Operación exitosa',
              data: mockEmpleados
          })).to.be.true;
      });

      it('Debería manejar errores al obtener los empleados', async () => {
          sinon.stub(Empleado, 'findAll').rejects(new Error('Error de base de datos'));

          const req = {};
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.getAllEmpleados(req, res);

          expect(res.status.calledWith(500)).to.be.true;
          expect(res.json.calledWith({
              code: 500,
              message: 'Error de base de datos',
              data: null
          })).to.be.true;
      });
  });

  describe('Método GET: Buscar empleados por todos los parámetros', () => {
      it('Debería buscar empleados exitosamente', async () => {
          const searchString = 'Juan';
          const mockEmpleados = [{ id: 1, nombre: 'Juan', apellido: 'Pérez' }];
          sinon.stub(Empleado, 'searchAllColumns').resolves(mockEmpleados);

          const req = { params: { q: searchString } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.searchAllColumns(req, res);

          expect(res.status.calledWith(200)).to.be.true;
          expect(res.json.calledWith({
              code: 200,
              message: 'Operación exitosa',
              data: mockEmpleados
          })).to.be.true;
      });

      it('Debería devolver un error si el parámetro "q" es obligatorio', async () => {
          const req = { params: {} };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.searchAllColumns(req, res);

          expect(res.status.calledWith(400)).to.be.true;
          expect(res.json.calledWith({
              code: 400,
              message: "El parámetro 'q' es obligatorio",
              data: null
          })).to.be.true;
      });
  });

  describe('Método POST: Crear un nuevo empleado', () => {
      it('Debería crear un empleado exitosamente', async () => {
          const nuevoEmpleado = { id: 1, nombre: 'Juan', apellido: 'Pérez' };
          sinon.stub(Empleado, 'create').resolves(nuevoEmpleado);

          const req = { body: { nombre: 'Juan', apellido: 'Pérez' } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.createEmpleado(req, res);

          expect(res.status.calledWith(201)).to.be.true;
          expect(res.json.calledWith({
              code: 201,
              message: 'Empleado creado exitosamente',
              data: nuevoEmpleado
          })).to.be.true;
      });

      it('Debería manejar errores al crear un empleado', async () => {
          sinon.stub(Empleado, 'create').rejects(new Error('Error al crear el empleado'));

          const req = { body: { nombre: 'Juan', apellido: 'Pérez' } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.createEmpleado(req, res);

          expect(res.status.calledWith(500)).to.be.true;
          expect(res.json.calledWith({
              code: 500,
              message: 'Error al crear el empleado',
              data: null
          })).to.be.true;
      });
  });

  describe('Método GET: Obtener un empleado por ID', () => {
      it('Debería obtener un empleado por ID exitosamente', async () => {
          const mockEmpleado = { id: 1, nombre: 'Juan', apellido: 'Pérez' };
          sinon.stub(Empleado, 'findById').resolves(mockEmpleado);

          const req = { params: { id: '1' } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.getEmpleadoById(req, res);

          expect(res.status.calledWith(200)).to.be.true;
          expect(res.json.calledWith({
              code: 200,
              message: 'Operación exitosa',
              data: mockEmpleado
          })).to.be.true;
      });

      it('Debería devolver un error 404 si el empleado no existe', async () => {
          sinon.stub(Empleado, 'findById').resolves(null);

          const req = { params: { id: '999' } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.getEmpleadoById(req, res);

          expect(res.status.calledWith(404)).to.be.true;
          expect(res.json.calledWith({
              code: 404,
              message: 'Empleado no encontrado',
              data: null
          })).to.be.true;
      });
  });

  describe('Método PUT: Actualizar un empleado', () => {
      it('Debería actualizar un empleado exitosamente', async () => {
          const empleadoActualizado = { id: 1, nombre: 'Juan', apellido: 'Pérez' };
          sinon.stub(Empleado, 'update').resolves(empleadoActualizado);

          const req = { params: { id: '1' }, body: { nombre: 'Juan', apellido: 'Pérez' } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.updateEmpleado(req, res);

          expect(res.status.calledWith(200)).to.be.true;
          expect(res.json.calledWith({
              code: 200,
              message: 'Empleado actualizado exitosamente',
              data: empleadoActualizado
          })).to.be.true;
      });

      it('Debería devolver un error 404 si el empleado no existe', async () => {
          sinon.stub(Empleado, 'update').resolves(null);

          const req = { params: { id: '999' }, body: { nombre: 'Juan', apellido: 'Pérez' } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.updateEmpleado(req, res);

          expect(res.status.calledWith(404)).to.be.true;
          expect(res.json.calledWith({
              code: 404,
              message: 'Empleado no encontrado',
              data: null
          })).to.be.true;
      });
  });

  describe('Método DELETE: Eliminar un empleado', () => {
      it('Debería eliminar un empleado exitosamente', async () => {
          const empleadoEliminado = { id: 1, nombre: 'Juan', apellido: 'Pérez' };
          sinon.stub(Empleado, 'delete').resolves(empleadoEliminado);

          const req = { params: { id: '1' } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.deleteEmpleado(req, res);

          expect(res.status.calledWith(200)).to.be.true;
          expect(res.json.calledWith({
              code: 200,
              message: 'Empleado eliminado exitosamente',
              data: null
          })).to.be.true;
      });

      it('Debería devolver un error 404 si el empleado no existe', async () => {
          sinon.stub(Empleado, 'delete').resolves(false);

          const req = { params: { id: '999' } };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.deleteEmpleado(req, res);

          expect(res.status.calledWith(404)).to.be.true;
          expect(res.json.calledWith({
              code: 404,
              message: 'Empleado no encontrado',
              data: null
          })).to.be.true;
      });
  });

  describe('Método GET: Descargar empleados en Excel', () => {
      it('Debería generar y descargar el archivo Excel exitosamente', async () => {
          const mockEmpleados = [
              { id: 1, nombre: 'Juan', apellido: 'Pérez' },
              { id: 2, nombre: 'Ana', apellido: 'Gómez' }
          ];
          sinon.stub(Empleado, 'generarExcel').resolves(mockEmpleados);
          sinon.stub(excel, 'write').returns(Buffer.from('test'));

          const req = {};
          const res = {
              setHeader: sinon.stub(),
              send: sinon.stub()
          };

          await EmpleadoController.downloadEmpleadosExcel(req, res);

          expect(res.setHeader.calledWith('Content-Disposition', 'attachment; filename=empleados.xlsx')).to.be.true;
          expect(res.setHeader.calledWith('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).to.be.true;
          expect(res.send.calledOnce).to.be.true;
      });

      it('Debería manejar errores al generar el archivo Excel', async () => {
          sinon.stub(Empleado, 'generarExcel').rejects(new Error('Error al generar el archivo Excel'));

          const req = {};
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub()
          };

          await EmpleadoController.downloadEmpleadosExcel(req, res);

          expect(res.status.calledWith(500)).to.be.true;
          expect(res.json.calledWith({
              code: 500,
              message: 'Error al generar el archivo Excel.',
              data: null
          })).to.be.true;
      });
  });
});