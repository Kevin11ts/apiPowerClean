import { expect } from 'chai';  
import supertest from 'supertest';
import express from 'express';
import clienteRouter from '../routes/clientes/clienteRoute.js';  
import detalleVentaRouter from '../routes/detalleVenta/detalleVentaRoute.js';  
import empleado from '../routes/empleados/empleadoRoute.js';  
import inventario from '../routes/inventario/inventarioRoute.js';  
import producto from '../routes/productos/productoRoute.js';  
import rol from '../routes/roles/rolRoute.js';  
import tipoProducto from '../routes/tipoProducto/tipoProductoRoute.js';  
import usuario from '../routes/usuarios/usuarioRoute.js';  
import venta from '../routes/ventas/ventaRoutes.js';  

const app = express();
app.use(express.json());
app.use('/api', clienteRouter);  
app.use('/api', detalleVentaRouter); 
app.use('/api', empleado);  
app.use('/api', inventario);  
app.use('/api', producto);  
app.use('/api', rol);  
app.use('/api', tipoProducto);  
app.use('/api', usuario);  
app.use('/api', venta);  


describe('Pruebas de las RUTAS de la API de clientes, método GET', () => {
  
  it('Debería obtener todos los clientes', async () => {
    const response = await supertest(app).get('/api/clientes');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});

describe('Pruebas de las RUTAS de la API del detalle de la venta, método GET', () => {
  
  it('Debería obtener todos los detalles de la venta', async () => {
    const response = await supertest(app).get('/api/detalleVenta');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});

describe('Pruebas de las RUTAS de la API empleados, método GET', () => {
  
  it('Debería obtener todos los empleados', async () => {
    const response = await supertest(app).get('/api/empleados');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});

describe('Pruebas de las RUTAS de la API de inventarios, método GET', () => {
  
  it('Debería obtener todo el inventario', async () => {
    const response = await supertest(app).get('/api/inventario');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});

describe('Pruebas de las RUTAS de la API de productos, método GET', () => {
  
  it('Debería obtener todo los productos', async () => {
    const response = await supertest(app).get('/api/productos');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});

describe('Pruebas de las RUTAS de la API sobre los roles, método GET', () => {
  
  it('Debería obtener todo los roles', async () => {
    const response = await supertest(app).get('/api/rol');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});

describe('Pruebas de las RUTAS de la API sobre los tipos de productos que existen, método GET', () => {
  
  it('Debería obtener todo los tipos de productos', async () => {
    const response = await supertest(app).get('/api/tipoProducto');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});

describe('Pruebas de las RUTAS de la API sobre los usuarios, método GET', () => {
  
  it('Debería obtener todo los usuarios', async () => {
    const token = 'powerclean'; // Sustituye por un token válido
    const response = await supertest(app)
      .get('/api/usuarios')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});

describe('Pruebas de las RUTAS de la API sobre todas las ventas, método GET', () => {
  
  it('Debería obtener todo las ventas', async () => {
    const response = await supertest(app).get('/api/venta');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data').that.is.an('array');
  });
});




