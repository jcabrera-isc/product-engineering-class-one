# Taller de Ramiro

App web para que un taller mecánico pequeño registre coches, actualice su estado y comparta el avance con el cliente por WhatsApp. Está pensada para usarse desde el celular, con botones grandes y pocos pasos. Todo está en español.

Es un sitio estático: no necesita servidor, base de datos ni proceso de compilación. Funciona en GitHub Pages tal como está.

## Qué incluye

- **Alta rápida de coches** con nombre del cliente, teléfono, placa y falla reportada.
- **Tres estados**: Recibido, Reparando y Listo. Se cambian con dos toques (abrir el coche y tocar el estado).
- **Panel del taller** con contadores por estado, búsqueda por placa, cliente o falla y orden por actualización.
- **Link para el cliente** que abre el estado y el avance de la reparación sin registro ni instalación.
- **Cotizaciones extra** con monto y descripción. El cliente las aprueba con un toque y la aprobación queda fechada.
- **Confirmación de aprobación**: el cliente puede enviar un link de vuelta por WhatsApp y el taller registra la aprobación en su teléfono. También se puede marcar como aprobada manualmente.
- **Respaldo e importación** de los datos en formato JSON desde Ajustes.
- **Sin inventario**, tal como se pidió.

## Cómo se usa

### Don Ramiro y los mecánicos

1. Abren la app en el celular.
2. Tocan **Dar de alta un coche** y capturan los cuatro datos. El coche queda como **Recibido**.
3. Para actualizar el estado, abren el coche y tocan **Recibido**, **Reparando** o **Listo**. El historial guarda fecha y hora.
4. Si hay una reparación extra, tocan **Agregar** en Cotizaciones extra, ponen concepto y monto, y envían el link al cliente.
5. Cuando cambie el estado o se agregue una cotización, conviene volver a enviar el link actualizado.

### El cliente

1. Recibe un link por WhatsApp.
2. Ve la placa, el estado, el avance, la falla reportada y las cotizaciones pendientes.
3. Si hay una reparación extra, toca **Aprobar esta cotización**. La fecha y hora quedan guardadas en su teléfono.
4. Puede tocar **Avisar al taller** para mandar la confirmación por WhatsApp. El taller abre ese link y la aprobación queda registrada en la orden.

## Dónde se guardan los datos

Los coches viven en el `localStorage` del navegador del teléfono donde se usa el panel del taller. No se suben a ningún servidor.

- Si se cambia de teléfono, de navegador o se borran los datos del sitio, la información no aparece. Usa **Ajustes → Descargar respaldo** con frecuencia.
- El link del cliente es una fotografía del estado al momento de compartirlo. Si el coche cambia después, hay que reenviar el link.
- La aprobación del cliente queda registrada en el teléfono del cliente y se sincroniza con el taller mediante el link de confirmación de WhatsApp. Si el cliente no lo envía, el taller puede marcarla manualmente como aprobada.

## Publicar en GitHub Pages

La app debe quedar en la raíz del repositorio (el `index.html` debe verse en la primera pantalla del repo).

### Opción A: Deploy from a branch (la más simple)

1. Sube el contenido de esta carpeta a un repositorio de GitHub, de modo que `index.html` quede en la raíz.
2. Entra a **Settings → Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`. Guarda.
5. Espera un momento y abre la URL que muestra GitHub Pages.

### Opción B: GitHub Actions

Esta carpeta incluye `.github/workflows/pages.yml`. Si el contenido de esta carpeta es la raíz del repositorio:

1. Sube el proyecto a GitHub.
2. Entra a **Settings → Pages**.
3. En **Source**, elige **GitHub Actions**.
4. Cada push a `main` publicará el sitio automáticamente.

Si la app queda dentro de una carpeta más grande (por ejemplo, un repositorio del curso), GitHub Pages no puede publicar esa subcarpeta directamente con el método de rama. En ese caso, mueve el contenido a la raíz del repositorio, cópialo a una carpeta `/docs` y selecciona `/docs`, o ajusta el workflow para publicar esa ruta.

### Probar en local

Como es un sitio estático, puedes abrir `index.html` directamente, pero para que funcionen bien el portapapeles y los links compartidos conviene servir la carpeta con cualquier servidor local:

```bash
npx serve .
```

## Estructura

```
index.html
css/styles.css
js/app.js
icon.svg
manifest.webmanifest
prompt.md
README.md
.nojekyll
.github/workflows/pages.yml
```

## Notas técnicas

- Sin dependencias, sin build y sin backend.
- Los links de WhatsApp agregan la lada `52` automáticamente a los teléfonos de 10 dígitos (México). Para otros países, captura el teléfono con su lada.
- La app usa `hash` en la URL (`#/coche/...`, `#/cliente/...`), así que funciona en GitHub Pages sin configurar redirecciones.
- Diseño mobile-first con objetivos táctiles de al menos 56 px, contraste alto y soporte para `prefers-reduced-motion`.
