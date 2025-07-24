$(document).ready(function () {
  let filaEditando = null;

  const dataActivos = [
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO001",
      "00001",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO001",
      "00001",
      "Sucursal demo",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO002",
      "00002",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO002",
      "00002",
      "Sucursal demo",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO003",
      "00003",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO003",
      "00003",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO004",
      "00004",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO004",
      "00004",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO005",
      "00005",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO005",
      "00005",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO006",
      "00006",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO006",
      "00006",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO007",
      "00007",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO007",
      "00007",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO008",
      "00008",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO008",
      "00008",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO009",
      "00009",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO009",
      "00009",
      "Denunciado demo",
      null,
    ],
    [
      "00/00/00",
      "Prueba",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO010",
      "00010",
      "Perfil demo",
      "Usuario demo",
      "CURPDEMO010",
      "00010",
      "Sucursal demo",
      "Denunciado demo",
      null,
    ],
  ];

  const t = $("#tablaBloqueados").DataTable({
    data: dataActivos,
    columns: [
      { title: "Fecha", width: "80px" },
      { title: "Fecha modificación", width: "120px" },
      { title: "Ejecutivo Hipotecario", width: "150px" },
      { title: "Perfil", width: "100px" },
      { title: "Estatus", width: "100px" },
      { title: "Comentario", width: "150px" },
      { title: "Nombre de usuario", width: "150px" },
      { title: "CURP", width: "130px" },
      { title: "ID Ejecutivo", width: "100px" },
      { title: "Fecha de nacimiento", width: "130px" },
      { title: "Sucursal", width: "90px" },
      { title: "Denunciado", width: "90px" },
      {
        title: "Acción",
        width: "180px",
        defaultContent: `
          <button class="btn-eliminar"><img src="../../imagenes/iconoInhabilitar.png" alt="Editar" width="20" height="20" /></button>
          <button class="btn-editar"><img src="../../imagenes/iconoEditar.png" alt="Editar" width="20" height="20" /></button>
          <button class="btn-mail"><img src="../../imagenes/iconoMail.png" alt="Editar" width="20" height="20" /></button>
          <button class="btn-eliminar"><img src="../../imagenes/iconoEliminar.png" alt="Editar" width="20" height="20" /></button>
        `,
        orderable: false,
        className: "dt-center"
      },
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
    },
    columnDefs: [
      {
        targets: -1, // Última columna
        width: "200px",
        className: "dt-center", // opcional, para centrar contenido
        // Puedes agregar estilos CSS aquí si quieres
      },
    ],
    scrollX: true,
    paging: true,
    searching: true,
    info: false,
  });

  // Botón para agregar fila
  $("#addRow").on("click", function () {
    const rowData = [
      $("#column1").val(),
      $("#column2").val(),
      $("#column3").val(),
      $("#column4").val(),
      $("#column5").val(),
      $("#column6").val(),
      $("#column7").val(),
      null,
    ];

    t.row.add(rowData).draw(false);
    limpiarFormulario();
  });

  // Evento para eliminar fila
  $("#tablaBloqueados tbody").on("click", ".btn-eliminar", function () {
    const row = t.row($(this).parents("tr"));
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        row.remove().draw();
        Swal.fire("¡Eliminado!", "La fila ha sido eliminada.", "success");
      }
    });
  });

  // Evento para editar fila
  $("#tablaBloqueados tbody").on("click", ".btn-editar", function () {
    filaEditando = t.row($(this).parents("tr"));
    const data = filaEditando.data();

    // Llenar inputs
    $("#column1").val(data[0]);
    $("#column2").val(data[1]);
    $("#column3").val(data[2]);
    $("#column4").val(data[3]);
    $("#column5").val(data[4]);
    $("#column6").val(data[5]);
    $("#column7").val(data[6]);

    // Cambiar título
    $(".modal-title-ejecutivo").text("Editar Ejecutivo");

    // Mostrar modal
    const modal = new bootstrap.Modal(
      document.getElementById("staticBackdrop")
    );
    modal.show();

    // Botones
    $("#addRow").hide();
    $("#saveEdit").show();
  });

  // Guardar cambios de edición
  $("#saveEdit").on("click", function () {
    if (filaEditando) {
      const updatedData = [
        $("#column1").val(),
        $("#column2").val(),
        $("#column3").val(),
        $("#column4").val(),
        $("#column5").val(),
        $("#column6").val(),
        $("#column7").val(),
        null,
      ];

      filaEditando.data(updatedData).draw(false);
      filaEditando = null;

      limpiarFormulario();
      $("#addRow").show();
      $("#saveEdit").hide();

      Swal.fire({
        icon: "success",
        title: "Cambios guardados",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  // Evento para enviar mail
  $("#tablaBloqueados tbody").on("click", ".btn-mail", function () {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se enviará un email al asesor para que ingrese su contraseña y active su cuenta.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes colocar una petición AJAX si deseas enviar algo al servidor
        Swal.fire({
          icon: "success",
          title: "¡Enviado!",
          text: "Se ha enviado el correo de activación al asesor.",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  });

  // Limpiar al cerrar modal
  $("#staticBackdrop").on("hidden.bs.modal", function () {
    limpiarFormulario();
    filaEditando = null;
    $("#addRow").show();
    $("#saveEdit").hide();
    $(".modal-title-ejecutivo").text("Nuevo Ejecutivo");
  });

  // Función para limpiar el formulario
  function limpiarFormulario() {
    $(
      "#column1, #column2, #column3, #column4, #column5, #column6, #column7"
    ).val("");
  }
});
