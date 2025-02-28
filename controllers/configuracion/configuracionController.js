import Configuracion from "../../models/configuracion/configuracion.js";

export const obtenerConfiguracion = async (req, res) => {
    try {
        const configuracion = await Configuracion.find();
        res.json(configuracion);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la configuración" });
    }
};

export const actualizarConfiguracion = async (req, res) => {
    try {
        const { elemento, valor } = req.body;
        const updatedConfig = await Configuracion.findOneAndUpdate(
            { elemento },
            { valor },
            { new: true }
        );
        res.json(updatedConfig);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la configuración" });
    }
};

export const obtenerConfiguracionInicial = async (req, res) => {
    try {
        const configuracion = await Configuracion.find();
        res.json(configuracion);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener configuración inicial" });
    }
};
