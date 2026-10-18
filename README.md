# Página web — Electricista matriculado

Página de una sola hoja (landing) para un electricista. Está hecha con HTML, CSS y JavaScript comunes, sin programas extra, y se publica gratis con **GitHub Pages**.

Este instructivo está pensado para alguien que **no programa**. Para cambiar casi todo alcanza con buscar una palabra y reemplazarla.

---

## 1. Qué hay en cada carpeta

| Archivo o carpeta | Para qué sirve | ¿Lo tengo que tocar? |
|---|---|---|
| `index.html` | Todos los textos y datos de la página | **Sí**, acá está casi todo |
| `img/trabajos/` | Fotos de los trabajos realizados | **Sí**, subí tus fotos |
| `img/foto-perfil.jpg` | Tu foto para la sección "Sobre mí" | **Sí** |
| `css/estilos.css` | Colores y diseño | Solo si querés cambiar colores |
| `js/main.js` | Animaciones y fotos ampliadas | No |
| `img/og-imagen.jpg` | Imagen que aparece al compartir el link | No (ya sirve así) |
| `img/favicon.svg` | Ícono de la pestaña (un rayo) | No |
| `.nojekyll` | Le avisa a GitHub que publique los archivos tal cual | No (no lo borres) |

---

## 2. Cómo editar un archivo

**Opción A — Desde la página de GitHub (sin instalar nada)**

1. Entrá al repositorio en github.com.
2. Apretá la tecla **punto (`.`)** del teclado. Se abre un editor en el navegador.
3. A la izquierda, hacé click en `index.html`.
4. Para buscar y reemplazar: **Ctrl + H** (en Mac: **Cmd + Option + F**).
   Escribí arriba lo que buscás, abajo lo nuevo, y tocá "Reemplazar todo".
5. Para guardar en GitHub: tocá el ícono de ramitas de la izquierda (Control de código fuente), escribí un mensaje corto como "Cambio teléfono" y tocá **Commit & Push**.

**Opción B — En tu computadora**

Abrí la carpeta con [Visual Studio Code](https://code.visualstudio.com/) (gratis) y usá **Ctrl + H** para buscar y reemplazar. Para ver cómo queda, hacé doble click en `index.html` y se abre en el navegador.

> 💡 En el código hay comentarios que dicen **`EDITAR`**. Buscá esa palabra con **Ctrl + F** y vas a ir saltando por cada dato que se puede cambiar.

---

## 3. Datos que tenés que completar

Todo lo que está entre **[CORCHETES]** es para reemplazar. Lo más cómodo es usar "Reemplazar todo" con cada uno:

| Buscá exactamente | Reemplazalo por | Ejemplo |
|---|---|---|
| `[NOMBRE DEL ELECTRICISTA]` | Tu nombre y apellido | Juan Pérez |
| `[XXXX]` | Tu número de matrícula | 12345 |
| `[X]` | Años de experiencia | 15 |
| `[ZONA]` | La zona general donde trabajás | Zona Oeste del GBA |
| `[LOCALIDAD 1]` … `[LOCALIDAD 6]` | Barrios o localidades | Morón, Haedo, Castelar… |
| `[TELÉFONO]` | Tu teléfono como lo querés mostrar | 11 2345-6789 |
| `[HORARIO]` | Tus horarios (aparece 2 veces: lunes a viernes y sábados) | 8 a 18 h |
| `+54XXXXXXXXXX` | Tu número para llamadas (ver punto 4) | +5491123456789 |
| `549XXXXXXXXXX` | Tu número de WhatsApp (ver punto 4) | 5491123456789 |

Si trabajás en menos (o más) localidades, borrá (o copiá) líneas como esta en la sección "ZONA DE COBERTURA":

```html
<li>[LOCALIDAD 1]</li>
```

---

## 4. Teléfono y WhatsApp (importante)

Los números van escritos **todos juntos, sin espacios, guiones ni paréntesis**.

### WhatsApp → buscá `549XXXXXXXXXX` (aparece 3 veces)

Se escribe: **549** + código de área **sin el 0** + número **sin el 15**.

| Tu número | Cómo va |
|---|---|
| (011) 15 2345-6789 | `5491123456789` |
| (0351) 15 234-5678 | `5493512345678` |

### Llamadas → buscá `+54XXXXXXXXXX` (aparece 3 veces)

- Si es **celular**: igual que WhatsApp pero con `+` adelante → `+5491123456789`
- Si es **teléfono fijo**: sin el 9 → `+541141234567`

> ⚠️ Si es un celular y te olvidás del **9**, el botón "Llamar" marca un número fijo y no te llega la llamada.

### Cambiar el mensaje que llega por WhatsApp

En los links de WhatsApp vas a ver `?text=Hola, quiero consultar por un trabajo eléctrico`. Podés cambiar lo que está después de `text=` por otro mensaje. Si lo cambiás, hacelo en los 3 lugares.

### Probarlo

Después de publicar, abrí la página **en tu celular** y tocá "Llamar" y "Escribir por WhatsApp" para confirmar que abren tu número.

---

## 5. Fotos de trabajos

Las fotos van en la carpeta **`img/trabajos/`**. Ahora hay 6 imágenes de muestra que dicen "FOTO DE TRABAJO 1", "2", etc.

### Reemplazar una foto (lo más fácil)

1. Renombrá tu foto exactamente igual que la de muestra: `trabajo-1.jpg`, `trabajo-2.jpg`, …
2. En GitHub entrá a la carpeta `img/trabajos`, tocá **Add file → Upload files**, arrastrá tus fotos y tocá **Commit changes**.
   Como tienen el mismo nombre, reemplazan a las de muestra.

**Reglas para los nombres de archivo:** todo en minúscula, sin espacios, sin acentos y terminado en `.jpg`.
GitHub distingue mayúsculas: `Trabajo-1.JPG` **no** es lo mismo que `trabajo-1.jpg`, y la foto no aparecería.

**Tamaño recomendado:** fotos horizontales, de unos 1200 píxeles de ancho y menos de 300 KB. Así la página carga rápido con datos móviles. Para achicarlas podés usar gratis [squoosh.app](https://squoosh.app/).

### Cambiar la descripción de cada foto

En `index.html`, buscá la sección "TRABAJOS REALIZADOS". Cada foto tiene dos textos:

```html
<img src="img/trabajos/trabajo-1.jpg" alt="Tablero eléctrico domiciliario terminado, con ..." ...>
<figcaption>Tablero domiciliario</figcaption>
```

- **`alt="..."`**: describe la foto con una frase. La usan los lectores de pantalla (personas ciegas) y Google. Cambiala para que diga lo que muestra **tu** foto.
- **`<figcaption>`**: el título corto que aparece abajo de la foto.

### Agregar o sacar fotos

- **Sacar:** borrá el bloque completo desde `<li class="galeria__item revelar">` hasta su `</li>`.
- **Agregar:** copiá un bloque completo, pegalo abajo del último y cambiá el nombre del archivo **en los dos lugares** (`href="..."` y `src="..."`), por ejemplo `trabajo-7.jpg`. Después subí esa foto a `img/trabajos/`.

---

## 6. Foto de perfil

Reemplazá **`img/foto-perfil.jpg`** por tu foto, con el mismo nombre. Conviene que sea **vertical** (por ejemplo 800 × 1000 píxeles), con buena luz y la cara bien visible.

---

## 7. Mapa de Google Maps

1. Abrí [Google Maps](https://www.google.com/maps) y buscá tu zona o localidad.
2. Tocá **Compartir → Insertar un mapa → Copiar HTML**.
3. En `index.html` buscá `mapa__placeholder`. Vas a ver un bloque así:

   ```html
   <div class="mapa__placeholder">
     ...
   </div>
   ```

4. Borrá ese bloque completo (desde `<div class="mapa__placeholder">` hasta su `</div>`) y pegá en su lugar lo que copiaste de Google Maps (empieza con `<iframe`).

No hace falta cambiar el tamaño que trae el código de Google: la página lo acomoda sola.

---

## 8. Otros cambios comunes

- **Textos:** buscá la frase que querés cambiar con Ctrl + F y escribí encima. Cuidado de no borrar los signos `<` `>` ni las comillas `"`.
- **Servicios:** en la sección "SERVICIOS", cada servicio es un bloque `<li class="tarjeta revelar"> ... </li>`. Borrá el que no hagas o cambiá su título (`<h3>`) y su texto (`<p>`).
- **Color de acento:** en `css/estilos.css`, al principio, está `--acento: #ffd23f;` (amarillo). Ahí mismo hay una nota explicando cómo pasarlo a celeste.

---

## 9. Publicar con GitHub Pages

1. En el repositorio, entrá a **Settings → Pages**.
2. En **Source** elegí **Deploy from a branch**.
3. En **Branch** elegí **main** y la carpeta **/ (root)**. Tocá **Save**.
4. Esperá uno o dos minutos. La página va a quedar en:

   **https://carlosvaldezalejandro.github.io/Jaime_Electricidad/**

Cada vez que guardes un cambio en GitHub, la página se actualiza sola en uno o dos minutos. Si no ves el cambio, recargá con **Ctrl + F5**.

> Con una cuenta gratuita de GitHub, el repositorio tiene que ser **público** para usar GitHub Pages.

### Imagen al compartir el link (opcional)

Cuando la página ya esté publicada, en `index.html` buscá `og:image`. Hay dos líneas comentadas: reemplazá `TU-USUARIO` y `TU-REPOSITORIO` por los de la dirección de arriba y borrá las marcas `<!--` y `-->` que las rodean. Así, al compartir el link por WhatsApp, aparece la imagen `img/og-imagen.jpg`.

---

## 10. Privacidad

La página no usa cookies, ni localStorage, ni herramientas de seguimiento. Lo único externo que se carga es de Google: las tipografías (Google Fonts) y, cuando lo pegues, el mapa de Google Maps.
