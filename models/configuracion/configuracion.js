import mongoose from "mongoose";

const configuracionSchema = new mongoose.Schema({
    elemento: String,
    estatus: String,
});

export default mongoose.model("Configuracion", configuracionSchema);
