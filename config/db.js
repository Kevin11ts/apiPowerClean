import pg from "pg";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Conexión a MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb+srv://kevin11:kevin11@cluster0.znfj1.mongodb.net/arduinoProyecto?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

const mongoDB = mongoose.connection;

// Manejo de errores de conexión a MongoDB
mongoDB.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
mongoDB.once("open", () => {
  console.log("Conexión a MongoDB establecida");
});

// Exportaciones
export default pool; // Para PostgreSQL
export { mongoDB }; // Para MongoDB