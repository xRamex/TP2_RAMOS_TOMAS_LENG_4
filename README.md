Sitio con dos secciones: Home (subida de imágenes con drag & drop y preview en el recuadro) y Contacto (formulario con validaciones y envío por EmailJS). Incluye navegación, estilos modernos y despliegue en GitHub Pages.

## Funcionalidades

- Subida de imágenes:
  - Arrastrar y soltar o seleccionar desde el explorador.
  - Validación de tipo: solo `image/*`.
  - Vista previa adentro del recuadro con altura máxima controlada.
  - Acciones: Cambiar imagen y Quitar.
- Navegación y páginas:
  - Navbar con rutas a Home y Contacto (usa HashRouter para compatibilidad con GitHub Pages).
- Contacto con EmailJS:
  - Validaciones de campos (nombre, email y mensaje).
  - Envío usando EmailJS desde el frontend.
  - Aviso de éxito tipo “toast” en la esquina inferior derecha.

## Ver online

👉 https://xramex.github.io/TP2_RAMOS_TOMAS_LENG_4/

Notas:

- El proyecto usa `HashRouter` para que las rutas funcionen correctamente en Pages.
- El `vite.config.js` define `base` y `outDir: docs` para publicar desde la rama principal.
