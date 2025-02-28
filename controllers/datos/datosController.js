import Datos from "../../models/datos/datos.js";
import Configuracion from "../../models/configuracion/configuracion.js";

//POST /datos - Recibir datos del Arduino y retornar configuración
export const recibirDatos = async (req, res) => {
    try {
        const { elemento, valor, unidades } = req.body;

        const nuevoDato = new Datos({ elemento, valor, unidades });
        await nuevoDato.save();

        const configuracion = await Configuracion.find();

        res.json({ 
            mensaje: "Dato guardado", 
            configuracion, 
            dato: nuevoDato // Solo retorna el dato recién guardado
        });
    } catch (error) {
        res.status(500).json({ error: "Error al recibir los datos" });
    }
};



// GET /datos - Consultar los datos almacenados
export const obtenerDatos = async (req, res) => {
    try {
        const datos = await Datos.find().sort({ timestamp: -1 });
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos" });
    }
};
