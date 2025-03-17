import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear las carpetas 'uploads/productos' y 'uploads/usuarios' si no existen
const uploadDir = 'uploads/';
const productosDir = path.join(uploadDir, 'productos/');
const usuariosDir = path.join(uploadDir, 'usuarios/');

[uploadDir, productosDir, usuariosDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configuración de almacenamiento dinámico
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determinar la carpeta de destino basada en la ruta de la solicitud
    const folder = req.originalUrl.includes('productos') ? productosDir : usuariosDir;
    cb(null, folder); // Guardar en la carpeta correspondiente
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes.'), false);
  }
};

// Configuración de Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de 5MB
  },
});

export default upload;