  // Extender Day.js
  dayjs.extend(window.dayjs_plugin_utc);
  dayjs.extend(window.dayjs_plugin_timezone);

  // Zona horaria
  const zonaHorariaCDMX = "America/Mexico_City";
  const hoy = dayjs().tz(zonaHorariaCDMX);

  // Función para obtener el color de fondo de las fechas
  function obtenerColorFondo(fecha, hoy) {
    const fechaHoySinHora = hoy.startOf("day");
    const fechaActualSinHora = fecha.startOf("day");
    if (fechaActualSinHora.isSame(fechaHoySinHora)) return "#e0ebe0";
    if (fechaActualSinHora.isAfter(fechaHoySinHora)) return "#ffffff";
    return "#efeeee";
  }

  // Recuperar tareas del localStorage
  function obtenerTareasGuardadas() {
    const tareasGuardadas = localStorage.getItem("tareasCalendario");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }

  // Guardar tareas en localStorage
  function guardarTareas(tareas) {
    localStorage.setItem("tareasCalendario", JSON.stringify(tareas));
  }

  // Renderizar tarea en el calendario
  function renderizarTareaEnCelda(tarea, celdas) {
    const fechaTarea = dayjs(tarea.fecha)
      .tz(zonaHorariaCDMX)
      .startOf("day");

    celdas.forEach((celda) => {
      const span = celda.querySelector("span");
      if (parseInt(span.textContent) === fechaTarea.date()) {
        const nuevaTarea = document.createElement("div");
        nuevaTarea.classList.add("tarea");
        nuevaTarea.innerHTML = `
              <strong>${tarea.titulo}</strong><br>
              <strong>${tarea.descripcion}</strong><br>
              <small>(${tarea.importancia})</small>
              
              <button class="eliminar-tarea"><img src="imagenes/iconoCerrar.png" alt=""></button>
            `;
        const colores = {
          Alta: "#fb5c5e",
          Media: "#f6c25a",
          Baja: "#9cd380",
        };
        nuevaTarea.style.backgroundColor = colores[tarea.importancia];
        nuevaTarea.style.color = "#fff";
        nuevaTarea.style.padding = "5px";
        nuevaTarea.style.borderRadius = "5px";
        nuevaTarea.style.marginTop = "5px";
        nuevaTarea.style.position = "relative";

        // Evento eliminar con SweetAlert2 y animación
        nuevaTarea
          .querySelector(".eliminar-tarea")
          .addEventListener("click", () => {
            Swal.fire({
              title: "¿Estás seguro?",
              text: "Esta acción no se puede deshacer.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#aaa",
              confirmButtonText: "Sí, eliminar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                nuevaTarea.style.transition = "opacity 0.5s ease";
                nuevaTarea.style.opacity = "0";

                setTimeout(() => {
                  nuevaTarea.remove();
                  const tareasActuales = obtenerTareasGuardadas().filter(
                    (t) =>
                      !(
                        t.titulo === tarea.titulo && t.fecha === tarea.fecha
                      )
                  );
                  guardarTareas(tareasActuales);

                  Swal.fire({
                    title: "Eliminado",
                    text: "La tarea ha sido eliminada.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });

                  // Actualizar el total de tareas después de eliminar
                  actualizarTotalTareas();
                }, 500);
              }
            });
          });

        celda.appendChild(nuevaTarea);
      }
    });
  }

  // Función para actualizar el total de tareas
  function actualizarTotalTareas() {
    const tareas = obtenerTareasGuardadas(); // Obtener las tareas del localStorage
    const totalTareas = tareas.length; // Contar el total de tareas
    document.getElementById("totalTareas").textContent = totalTareas; // Actualizar el contador en la interfaz
  }

  // Renderizar calendario y tareas guardadas
  document.addEventListener("DOMContentLoaded", () => {
    const bodyCalendario = document.getElementById("bodyCalendario");
    let primerDiaSemana = hoy
      .startOf("week")
      .add(hoy.startOf("week").day() === 0 ? 1 : 0, "day");
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const fechasVisibles = [];

    const fila = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
      const fecha = primerDiaSemana.add(i, "day");
      const td = document.createElement("td");
      const span = document.createElement("span");
      span.textContent = fecha.format("DD"); // Usamos format('DD') para asegurar que siempre tenga 2 dígitos
      const divMes = document.createElement("div");
      divMes.classList.add("mes");
      divMes.textContent = meses[fecha.month()];
      fechasVisibles.push(fecha.startOf("day"));
      td.style.backgroundColor = obtenerColorFondo(fecha, hoy);
      if (fecha.startOf("day").isSame(hoy.startOf("day"))) {
        span.classList.add("diaActual");
      }
      td.appendChild(span);
      td.appendChild(divMes);
      fila.appendChild(td);
    }

    bodyCalendario.appendChild(fila);
    window.fechasVisibles = fechasVisibles;

    // Renderizar tareas almacenadas
    const celdas = document.querySelectorAll("#bodyCalendario td");
    const tareas = obtenerTareasGuardadas();
    tareas.forEach((tarea) => renderizarTareaEnCelda(tarea, celdas));

    // Inicializar el total de tareas al cargar la página
    actualizarTotalTareas();
  });

  // Guardar nueva tarea
    document
      .getElementById("formNuevaTarea")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const ejecutivo = document.getElementById("ejecutivoTarea").value;
        const cliente = document.getElementById("clienteTarea").value;
        const pedido = document.getElementById("pedidoTarea").value;
        const titulo = document.getElementById("tituloTarea").value;
        const descripcion = document.getElementById("descripcionTarea").value;
        const fecha = document.getElementById("fechaTarea").value;
        const importancia = document.getElementById("importanciaTarea").value;

        if (!ejecutivo || !titulo || !fecha || !importancia) {
          return Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor, completa todos los campos.",
          });
        }

        const fechaSeleccionada = dayjs(fecha)
          .tz(zonaHorariaCDMX)
          .startOf("day");

        // 🚫 Verificar si es fecha pasada
        if (fechaSeleccionada.isBefore(hoy.startOf("day"))) {
          return Swal.fire({
            icon: "error",
            title: "Fecha inválida",
            text: "No puedes agregar tareas en días pasados.",
          });
        }

        const fechaEstaVisible = window.fechasVisibles.some((fv) =>
          fechaSeleccionada.isSame(fv)
        );
        if (!fechaEstaVisible) {
          return Swal.fire({
            icon: "warning",
            title: "Fuera del rango",
            text: "La fecha seleccionada no está en el calendario.",
          });
        }

        // Crear un ID único para la tarea
        const tareaId = Date.now(); // ID único basado en el timestamp

        const nuevaTarea = {
          id: tareaId, // Asignar ID único
          ejecutivo,
          cliente,
          pedido,
          descripcion,
          titulo,
          fecha: fechaSeleccionada.toISOString(),
          importancia,
        };

        const tareasActuales = obtenerTareasGuardadas();
        tareasActuales.push(nuevaTarea);
        guardarTareas(tareasActuales);

        const celdas = document.querySelectorAll("#bodyCalendario td");
        renderizarTareaEnCelda(nuevaTarea, celdas);

        // Limpiar formulario
        document.getElementById("ejecutivoTarea").value = "";
        document.getElementById("clienteTarea").value = "";
        document.getElementById("pedidoTarea").value = "";
        document.getElementById("tituloTarea").value = "";
        document.getElementById("descripcionTarea").value = "";
        document.getElementById("fechaTarea").value = "";
        document.getElementById("horaTarea").value = "";
        document.getElementById("importanciaTarea").value = "";

        // Actualizar el total de tareas después de agregar
        actualizarTotalTareas();

        // Verificar en consola
        console.log('Tareas guardadas:', obtenerTareasGuardadas());
      });