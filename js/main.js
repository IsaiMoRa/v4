// COMPONENTE MENU
fetch("../componentes/menu.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("menu").innerHTML = html;

    const path = window.location.pathname.split("/").pop();

    const adminPages = [
      "facturas.html",
      "asesores.html",
      "inhabilitados.html",
      "bloqueados.html",
      "community.html",
      // agrega más si tienes
    ];


    // 🔥 MENÚ DINÁMICO
    const navLinks = document.querySelectorAll("#menu .nav_link");

    navLinks.forEach((link) => {
      // Resaltar enlace activo
      const href = link.getAttribute("href");
      if (href === path) {
        link.classList.add("active");
      }

      // Agregar evento dinámico solo si tiene submenú
      const submenu = link.nextElementSibling;
      if (submenu && submenu.classList.contains("menuAdministracion")) {
        $(link).on("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          // Oculta otros submenús
          $(".menuAdministracion").not(submenu).slideUp(300);
          $(submenu).slideToggle(300);
        });
      }
    });


    // Evitar cierre al hacer clic dentro del submenú
    $(".menuAdministracion").on("click", function (e) {
      e.stopPropagation();
    });

    // Cerrar submenús al hacer clic fuera
    $(document).on("click", function () {
      $(".menuAdministracion").slideUp(300);
    });

    // 👇 SE OCULTAN ELEMENTOS DEL MENU EN VERSION MOBIL
    $("#header-toggle").on("click", function () {
      $("body").toggleClass("compact");

      if (window.innerWidth < 600) {
        $(".nombreUsuario, .btnProspectos, .buscadorContent, .iconosAjustes").toggleClass("d-none");

        const icono = $(".iconoSalir");
        if (icono.css("top") === "28px") {
          icono.css("top", "");
        } else {
          icono.css("top", "28px");
        }
      }
    });
  })
  .catch((err) => console.error("Error al cargar el menú:", err));


// COMPONENTE FIN MENU

// ELEMENTOS HEADER
fetch("../componentes/header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("componenteHeader").innerHTML = html;
    // SIDE NAV
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId);

      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener("click", () => {
          nav.classList.toggle("show");
          toggle.classList.toggle("bx-x");
          bodypd.classList.toggle("body-pd");
          headerpd.classList.toggle("body-pd");
        });
      }
    };

    showNavbar("header-toggle", "nav-bar", "body-pd", "header");

    const linkColor = document.querySelectorAll(".nav_link");
    function colorLink() {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));

    var myLink = document.querySelector('a[href="#"]');
    myLink.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });

// COMPONENTE PROSPECTOS
fetch("../componentes/modal/prospectos.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("componenteProspectos").innerHTML = html;

    // Ejecutar el código jQuery después de cargar el contenido
    $(document).ready(function () {
      function toggleCard(triggerId, targetId) {
        const target = $("#" + targetId);
        const trigger = $("#" + triggerId);

        if (target.is(":visible")) {
          // Ocultar si ya está visible
          target.fadeTo(250, 0, function () {
            target.slideUp(400);
          });

          // Quitar clase active si se hace clic sobre el mismo
          trigger.removeClass("activeCard");
        } else {
          // Cerrar otros contenidos visibles
          $(".contenido-ajuste").each(function () {
            if ($(this).is(":visible")) {
              $(this).fadeTo(250, 0, function () {
                $(this).slideUp(400);
              });
            }
          });

          // Quitar clase active de todas las tarjetas
          $(".card").removeClass("activeCard");

          // Mostrar el contenido correspondiente
          target.slideDown(400, function () {
            target.fadeTo(250, 1);
          });

          // Agregar clase active a la tarjeta seleccionada
          trigger.addClass("activeCard");
        }
      }

      // Asociar los clics de las tarjetas con la función toggleCard
      $("#cardHipotecario").on("click", function () {
        toggleCard("cardHipotecario", "hipotecario");
      });

      $("#cardPymeFisico").on("click", function () {
        toggleCard("cardPymeFisico", "pymeFisico");
      });

      $("#cardPymeMoral").on("click", function () {
        toggleCard("cardPymeMoral", "PymeMoral");
      });
    });
  })
  .catch((error) => console.error("Error al cargar el modal:", error));

// COMPONENTE NOTIFACIONES
fetch("../componentes/notificaciones.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("componenteToast").innerHTML = html;

    // Espera a que el contenido se cargue y luego ejecuta tu lógica
    const toastTrigger = document.getElementById("liveToastBtn");
    const toastLive = document.getElementById("liveToast");

    const toast = new bootstrap.Toast(toastLive, {
      delay: 8000, // 8 segundos
      autohide: true,
    });

    if (toastTrigger) {
      toastTrigger.addEventListener("click", () => {
        toast.show();
      });
    }
  });

// COMPONENTE AJUSTES
fetch("../componentes/modal/ajustes.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("componenteAjustes").innerHTML = html;

    // Ejecutar el código jQuery después de cargar el contenido
    $(document).ready(function () {
      function toggleCard(triggerId, targetId) {
        const target = $("#" + targetId);
        const trigger = $("#" + triggerId);

        if (target.is(":visible")) {
          // Ocultar si ya está visible
          target.fadeTo(250, 0, function () {
            target.slideUp(400);
          });

          // Quitar clase active si se hace clic sobre el mismo
          trigger.removeClass("activeCard");
        } else {
          // Cerrar otros contenidos visibles
          $(".contenido-ajuste").each(function () {
            if ($(this).is(":visible")) {
              $(this).fadeTo(250, 0, function () {
                $(this).slideUp(400);
              });
            }
          });

          // Quitar clase active de todas las tarjetas
          $(".card").removeClass("activeCard");

          // Mostrar el contenido correspondiente
          target.slideDown(400, function () {
            target.fadeTo(250, 1);
          });

          // Agregar clase active a la tarjeta seleccionada
          trigger.addClass("activeCard");
        }
      }

      // Asociar los clics de las tarjetas con la función toggleCard
      $("#cardPerfil").on("click", function () {
        toggleCard("cardPerfil", "perfil");
      });

      $("#cardPago").on("click", function () {
        toggleCard("cardPago", "pago");
      });

      $("#cardAlertas").on("click", function () {
        toggleCard("cardAlertas", "alertas");
      });

      $("#cardTutoriales").on("click", function () {
        toggleCard("cardTutoriales", "tutoriales");
      });

      $("#cardCotizador").on("click", function () {
        toggleCard("cardCotizador", "cotizador");
      });
    });
  })
  .catch((error) => console.error("Error al cargar el modal:", error));

// ✅  COMPONENTES AJUSTES  //
async function cargarComponente(ruta, idContenedor) {
  try {
    const rutaSinCache = `${ruta}?v=${new Date().getTime()}`;
    const response = await fetch(rutaSinCache);
    if (!response.ok) {
      throw new Error(
        `No se pudo cargar el componente: ${ruta} (status: ${response.status})`
      );
    }
    const html = await response.text();
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) {
      console.error(`No se encontró el contenedor con id: "${idContenedor}"`);
      return;
    }
    contenedor.innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el componente:", error);
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  // COMPONENTE PERFIL
  await cargarComponente(
    "../componentes/ajustes/perfil.html",
    "componenteAjustesPerfil"
  );
  await cargarComponente(
    "../componentes/ajustes/perfil/datos-perfil.html",
    "componenteDatosPerfil"
  );

  // COMPONENTE MICROSITIOS
  await cargarComponente(
    "../componentes/ajustes/micrositios.html",
    "componenteMicrositios"
  );
  await cargarComponente(
    "../componentes/ajustes/micrositios/datos-oficina.html",
    "componenteDatosOficina"
  );
  await cargarComponente(
    "../componentes/ajustes/micrositios/productos-bancarios.html",
    "componenteProductosBancarios"
  );
  await cargarComponente(
    "../componentes/ajustes/micrositios/simuladores-credito.html",
    "componenteSimuladoresCredito"
  );
  await cargarComponente(
    "../componentes/ajustes/micrositios/imagen-instalaciones.html",
    "componenteImagenesInstalaciones"
  );

  // COMPONENTE TARJETA DIGITAL
  await cargarComponente(
    "../componentes/ajustes/tarjeta-digital.html",
    "componenteTarjetaDigital"
  );
  await cargarComponente(
    "../componentes/ajustes/tarjeta/datos-asesor.html",
    "componenteDatosAsesor"
  );
  await cargarComponente(
    "../componentes/ajustes/tarjeta/productos-bancarios.html",
    "componenteTarjetaProductosBancarios"
  );
  await cargarComponente(
    "../componentes/ajustes/tarjeta/simuladores-credito.html",
    "componenteTarjetaSimuladoresCredito"
  );
  await cargarComponente(
    "../componentes/ajustes/tarjeta/clientes-satisfechos.html",
    "componenteTarjetaClienteSatisfecho"
  );

  // COMPONENTE CERTIFICACIONES
  await cargarComponente(
    "../componentes/ajustes/certificaciones.html",
    "componenteCertificaciones"
  );
  // SWITCH MIDOT
  function toggleMidot() {
    if ($("#flexSwitchCheckChecked").is(":checked")) {
      $(".midot").show();
    } else {
      $(".midot").hide();
    }
  }
  toggleMidot();
  $("#flexSwitchCheckChecked").on("change", toggleMidot);

  // COMPONENTE CONTRASEÑA
  await cargarComponente(
    "../componentes/ajustes/contraseña.html",
    "componenteContrasena"
  );
});
