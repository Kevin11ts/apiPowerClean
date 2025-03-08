import Data from "../../models/datos/datos.js";

class DataController {
    // Obtener todos los registros
    static async getAll(req, res) {
        try {
            const respuesta = await Data.find();
            res.send(respuesta);
        } catch (error) {
            res.status(500).send({ message: "Error al obtener los datos", error });
        }
    }

    // Crear un nuevo registro
    static async create(req, res) {
        try {
            const { ledVerde, ledAmarillo, ledRojo, pot1, pot2, buzzer } = req.query;

            // Validar que todos los parámetros existan
            if (!ledVerde || !ledAmarillo || !ledRojo || !pot1 || !pot2 || !buzzer) {
                return res.status(400).send({ message: "Faltan parámetros en la solicitud" });
            }

            // Crear los objetos con los datos recibidos
            const dataLedVerde = await Data.create({
                sensor: "LED Verde",
                unidad: "Estado",
                valor: ledVerde
            });

            const dataLedAmarillo = await Data.create({
                sensor: "LED Amarillo",
                unidad: "Estado",
                valor: ledAmarillo
            });

            const dataLedRojo = await Data.create({
                sensor: "LED Rojo",
                unidad: "Estado",
                valor: ledRojo
            });

            const dataPot1 = await Data.create({
                sensor: "Potenciómetro 1",
                unidad: "Valor",
                valor: pot1
            });

            const dataPot2 = await Data.create({
                sensor: "Potenciómetro 2",
                unidad: "Valor",
                valor: pot2
            });

            const dataBuzzer = await Data.create({
                sensor: "Buzzer",
                unidad: "Estado",
                valor: buzzer
            });

            res.send({
                message: "Datos guardados correctamente",
                data: [dataLedVerde, dataLedAmarillo, dataLedRojo, dataPot1, dataPot2, dataBuzzer]
            });

        } catch (error) {
            res.status(500).send({ message: "Error al crear el registro", error });
        }
    }
}

export default DataController;