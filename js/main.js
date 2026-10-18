/* ==========================================================================
   JAVASCRIPT DE LA LANDING
   --------------------------------------------------------------------------
   La página funciona aunque este archivo no cargue: el teléfono, el WhatsApp
   y las fotos son links comunes escritos en el HTML. Este archivo solo suma
   mejoras:
     1. Pone el año actual en el pie de página.
     2. Hace aparecer las secciones de a poco al bajar (scroll).
     3. Abre las fotos de "Trabajos realizados" en grande (lightbox).

   No usa cookies, ni localStorage, ni ningún tipo de seguimiento.
   ========================================================================== */

(function () {
  'use strict';

  // ¿La persona pidió en su celular o computadora reducir las animaciones?
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* 1. AÑO ACTUAL EN EL PIE DE PÁGINA ===================================== */
  function ponerAnioActual() {
    const anio = document.getElementById('anio');
    if (anio) {
      anio.textContent = String(new Date().getFullYear());
    }
  }


  /* 2. APARICIÓN AL HACER SCROLL ==========================================
     Los elementos con la clase "revelar" aparecen suavemente cuando entran
     en la pantalla. Si el navegador es muy viejo o la persona prefiere menos
     movimiento, no se hace nada y todo se ve directamente.
     ======================================================================= */
  function iniciarRevelado() {
    const elementos = document.querySelectorAll('.revelar');

    if (reducirMovimiento || !('IntersectionObserver' in window) || elementos.length === 0) {
      return;
    }

    // Recién ahora, con el JavaScript funcionando, se ocultan los elementos
    // (el CSS los esconde solo cuando <html> tiene esta clase).
    document.documentElement.classList.add('js-revelar');

    const observador = new IntersectionObserver(function (entradas) {
      let orden = 0;

      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) {
          return;
        }
        // Si entran varios a la vez (por ejemplo, una fila de tarjetas),
        // cada uno arranca un poquito después que el anterior (con un tope,
        // para que nada tarde demasiado en aparecer).
        entrada.target.style.setProperty('--retraso', (Math.min(orden, 4) * 90) + 'ms');
        orden += 1;

        entrada.target.classList.add('visible');
        // Ya apareció: no hace falta seguir mirándolo.
        observador.unobserve(entrada.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    elementos.forEach(function (elemento) {
      observador.observe(elemento);
    });
  }


  /* 3. LIGHTBOX (FOTO AMPLIADA) ===========================================
     Al tocar una foto de la galería se abre en grande dentro de un <dialog>.
     - Botón "Cerrar", tecla Escape o tocar el fondo oscuro: cierra.
     - Flechas en pantalla o flechas del teclado: foto anterior / siguiente.
     - En el celular también se puede deslizar el dedo a los costados.
     Si el navegador no soporta <dialog>, cada foto se abre como un link común.
     ======================================================================= */
  function iniciarLightbox() {
    const dialogo = document.getElementById('lightbox');
    const enlaces = Array.prototype.slice.call(document.querySelectorAll('.galeria__enlace'));

    if (!dialogo || typeof dialogo.showModal !== 'function' || enlaces.length === 0) {
      return;
    }

    const imagen = dialogo.querySelector('.lightbox__imagen');
    const epigrafe = dialogo.querySelector('.lightbox__epigrafe');
    const contador = dialogo.querySelector('.lightbox__contador');
    const botonCerrar = dialogo.querySelector('.lightbox__cerrar');
    const botonAnterior = dialogo.querySelector('.lightbox__flecha--anterior');
    const botonSiguiente = dialogo.querySelector('.lightbox__flecha--siguiente');

    const total = enlaces.length;
    let actual = 0;            // número de la foto que se está mostrando
    let toqueInicioX = null;   // dónde apoyó el dedo (para deslizar)

    // Convierte cualquier número en una posición válida:
    // después de la última vuelve a la primera y viceversa.
    function posicionValida(indice) {
      return (indice + total) % total;
    }

    // Carga la foto número "indice" con su descripción y el contador "2 / 6"
    function mostrar(indice) {
      actual = posicionValida(indice);

      const enlace = enlaces[actual];
      const miniatura = enlace.querySelector('img');
      const figura = enlace.closest('figure');
      const textoEpigrafe = figura ? figura.querySelector('figcaption') : null;

      imagen.src = enlace.getAttribute('href');
      imagen.alt = miniatura ? miniatura.alt : '';
      epigrafe.textContent = textoEpigrafe ? textoEpigrafe.textContent.trim() : '';
      contador.textContent = 'Foto ' + (actual + 1) + ' / ' + total;

      // Deja cargando la anterior y la siguiente para que el cambio sea instantáneo
      precargar(actual + 1);
      precargar(actual - 1);
    }

    function precargar(indice) {
      const imagenOculta = new Image();
      imagenOculta.src = enlaces[posicionValida(indice)].getAttribute('href');
    }

    function abrir(indice) {
      mostrar(indice);
      document.documentElement.classList.add('sin-scroll');
      dialogo.showModal();
    }

    function cerrar() {
      dialogo.close();
    }

    // Tocar una foto de la galería abre el lightbox en lugar de ir al archivo
    enlaces.forEach(function (enlace, indice) {
      enlace.addEventListener('click', function (evento) {
        // Con Ctrl, Cmd o Shift (abrir en otra pestaña) se deja actuar al navegador
        if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.button !== 0) {
          return;
        }
        evento.preventDefault();
        abrir(indice);
      });
    });

    botonCerrar.addEventListener('click', cerrar);

    botonAnterior.addEventListener('click', function () {
      mostrar(actual - 1);
    });

    botonSiguiente.addEventListener('click', function () {
      mostrar(actual + 1);
    });

    // Tocar el fondo oscuro (fuera de la foto) también cierra
    dialogo.addEventListener('click', function (evento) {
      if (evento.target === dialogo) {
        cerrar();
      }
    });

    // Teclado: flechas izquierda/derecha cambian de foto.
    // La tecla Escape la maneja el navegador y dispara el evento "close".
    dialogo.addEventListener('keydown', function (evento) {
      if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        mostrar(actual + 1);
      } else if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        mostrar(actual - 1);
      }
    });

    // Celular: deslizar el dedo a la izquierda o a la derecha
    dialogo.addEventListener('touchstart', function (evento) {
      toqueInicioX = evento.changedTouches[0].clientX;
    }, { passive: true });

    dialogo.addEventListener('touchend', function (evento) {
      if (toqueInicioX === null) {
        return;
      }
      const distancia = evento.changedTouches[0].clientX - toqueInicioX;
      toqueInicioX = null;

      // Menos de 50 píxeles se toma como un toque, no como deslizar
      if (Math.abs(distancia) < 50) {
        return;
      }
      mostrar(distancia < 0 ? actual + 1 : actual - 1);
    }, { passive: true });

    // Al cerrar (por cualquier vía): se libera el scroll de la página y el
    // foco del teclado vuelve a la foto que se estaba viendo.
    dialogo.addEventListener('close', function () {
      document.documentElement.classList.remove('sin-scroll');
      enlaces[actual].focus();
    });
  }


  /* ARRANQUE ============================================================== */
  ponerAnioActual();
  iniciarRevelado();
  iniciarLightbox();
})();
