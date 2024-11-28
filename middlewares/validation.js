// validateUser.js
import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('El correo debe tener un formato válido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
