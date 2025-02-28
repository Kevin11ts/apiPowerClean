import mongoose from "mongoose";

const datosSchema = new mongoose.Schema({
    elemento: String,
    valor: Number,
    unidades: String,
    timestamp: { type: Date, default: Date.now }
}, { versionKey: false });

export default mongoose.model("Datos", datosSchema);
