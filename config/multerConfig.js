import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

// Configurar almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'usuarios', // Carpeta en Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
        public_id: (req, file) => `usuario_${req.params.id}`, // Nombre único
    },
});

// Configurar Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no soportado. Solo se permiten imágenes JPEG, JPG y PNG.'));
        }
    },
});

export default upload;
