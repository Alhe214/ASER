# Tribu de Aser · Sitio web

Sitio estático (HTML + CSS + JavaScript puro, sin instalar nada).
Estilo juvenil: verde olivo + dorado + crema. Fuentes: Anton y Space Grotesk (Google Fonts).

## Estructura

```
├── index.html          Inicio (con el contador del evento especial)
├── nosotros.html       Quiénes somos
├── actividades.html    Actividades, cómo participar y preguntas frecuentes
├── horarios.html       Horario semanal + agregar al calendario
├── galeria.html        Galería
├── testimonios.html    Testimonios
├── contacto.html       Formulario que abre WhatsApp
├── css/styles.css      Estilos (colores en :root, arriba del archivo)
├── js/config.js        ⭐ AQUÍ se activa/desactiva el contador del evento
├── js/main.js          Animaciones e interacciones
└── assets/img/         ← AQUÍ van tus imágenes
```

## ⭐ Contador de evento (poner / quitar)

Abre `js/config.js`:

- **Quitarlo:** cambia `activo: true` por `activo: false`.
- **Poner uno nuevo:** `activo: true` y cambia `titulo`, `descripcion` y `fecha`.
- Formato de fecha: `"AAAA-MM-DDTHH:MM:00-06:00"` (hora de Guatemala, 24 h).
  Ejemplo: sábado 14 nov 2026, 6:00 PM → `"2026-11-14T18:00:00-06:00"`.
- Si no lo quitas, se oculta solo 3 horas después de que empieza (`ocultarDespuesHoras`).
- Cuando llega la hora aparece "¡Ya empezó!" con confeti.

## Imágenes que debes copiar a `assets/img/`

- `LogoAser.PNG`
- `ASER1.jpeg` … `ASER6.jpeg`

## Cómo verlo en VS Code

Instala la extensión **Live Server**, clic derecho en `index.html` → *Open with Live Server*.

## Qué editar

| Quiero cambiar…        | Dónde                                                                    |
|------------------------|--------------------------------------------------------------------------|
| Evento / contador      | `js/config.js`                                                           |
| Colores                | `css/styles.css`, bloque `:root`                                         |
| Número de WhatsApp     | `js/main.js` → `CONFIG.whatsapp` y los enlaces `wa.me/...` en los HTML   |
| Horarios               | Filas `<div class="row" data-day data-time data-name>` en `index.html` y `horarios.html` (`data-day`: 0=Domingo … 6=Sábado; `data-time`: 24 h) |
| Fotos de galería       | Copia una línea `<figure>` en `galeria.html`                             |
| Testimonios            | Copia un `<blockquote class="quote">` en `testimonios.html`              |
| Mapa de la iglesia     | `contacto.html`, reemplaza el `div.map-box` por el iframe de Google Maps |

## Publicar en GitHub Pages

Sube todo el contenido de la carpeta al repositorio y activa *Settings → Pages → Deploy from branch*.
