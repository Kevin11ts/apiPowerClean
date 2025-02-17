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
    port: process.env.DB_PORT
});

// Conexión a MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/arduinoDB";

mongoose.connect(mongoURI);


const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
mongoDB.once("open", () => {
    console.log("Conectado a MongoDB");
});

// Exportaciones correctas
export default pool;
export { mongoDB };
