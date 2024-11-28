export const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1]; // Extraer el token
    if (token === 'powerclean') { // Este es solo un ejemplo, deberías verificar un token real
      console.log("Autenticación exitosa");
      next();
    } else {
      console.error("Token inválido");
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    console.error("Fallo de autenticación. Encabezado 'Authorization' faltante o incorrecto");
    res.status(401).json({ message: 'Unauthorized' });
  }
};
