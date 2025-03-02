import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la carpeta 'uploads/' si no existe
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Carpeta donde se guardarán los archivos temporalmente
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Extensión del archivo
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Nombre único del archivo
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes.'), false); // Rechazar el archivo
  }
};

// Configuración de Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de 5MB
  },
});

export default upload;