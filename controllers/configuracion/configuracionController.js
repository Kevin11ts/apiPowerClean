import ConfigInit from "../../models/configuracion/configuracion.js";
import Data from "../../models/datos/datos.js";

class ConfigInitController {
  // Obtener todos los registros
  static async getAll(req, res) {
    try {
      const { ledVerde, ledAmarillo, ledRojo, pot1, pot2, buzzer, ultrasonico } = req.query;

      // Validar que todos los parámetros estén presentes
      if (!ledVerde || !ledAmarillo || !ledRojo || !pot1 || !pot2 || !buzzer || !ultrasonico) {
        return res.status(400).send({ message: "Faltan parámetros en la solicitud" });
      }

      // Buscar y actualizar la configuración inicial
      const config = await ConfigInit.findOneAndUpdate(
        {}, // Busca el primer documento (puedes ajustar esto si tienes un criterio específico)
        {
          ledVerde,
          ledAmarillo,
          ledRojo,
          pot1,
          pot2,
          buzzer,
          ultrasonico,
        },
        { new: true, upsert: true } // `new: true` devuelve el documento actualizado, `upsert: true` crea el documento si no existe
      );

      // Si no se encontró o creó la configuración, devolver un error
      if (!config) {
        return res.status(404).send({ message: "No se pudo encontrar o crear la configuración en ConfigInit" });
      }

      // Crear documentos en la colección Data
      const nuevosDatos = await Data.insertMany([
        { sensor: "LED Verde", unidad: "Estado", valor: ledVerde },
        { sensor: "LED Amarillo", unidad: "Estado", valor: ledAmarillo },
        { sensor: "LED Rojo", unidad: "Estado", valor: ledRojo },
        { sensor: "Potenciómetro 1", unidad: "Valor", valor: pot1 },
        { sensor: "Potenciómetro 2", unidad: "Valor", valor: pot2 },
        { sensor: "Buzzer", unidad: "Estado", valor: buzzer },
        { sensor: "Sensor Ultrasónico", unidad: "cm", valor: ultrasonico } 
      ]);

      // Enviar la respuesta con la configuración actualizada y los nuevos datos
      res.send(config);

    } catch (error) {
      res.status(500).send({ message: "Error al obtener la configuración y crear los datos", error });
    }
  }

  // Actualizar un registro por ID
  static async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
      const respuesta = await ConfigInit.findOneAndUpdate(
        { _id: id },
        body,
        { new: true }
      );
      if (!respuesta) {
        return res.status(404).send({ message: "Registro no encontrado" });
      }
      
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el registro", error });
    }
  }
}

export default ConfigInitController;