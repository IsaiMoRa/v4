$(document).ready(function () {
    let filaEditando = null;
  
    const dataActivos = [
      [
        `<a href='#!'  class='iconoTable activeTable'>Comercializador demo</a> `,
        "Promotor de vivienda - Inmobiliario",
        "Gerente de ventas",
        `<img src="../../imagenes/check.png" alt="Editar" width="20" height="20" />`,
        null,
      ],
      [
        `<a href='#!'  class='iconoTable activeTable'>Comercializador demo</a> `,
        "Promotor de vivienda - Inmobiliario",
        "Gerente de ventas",
        `<img src="../../imagenes/check.png" alt="Editar" width="20" height="20" />`,
        null,
      ],
      [
        `<a href='#!'  class='iconoTable activeTable'>Comercializador demo</a> `,
        "Promotor de vivienda - Inmobiliario",
        "Gerente de ventas",
        `<img src="../../imagenes/check.png" alt="Editar" width="20" height="20" />`,
        null,
      ],
      [
        `<a href='#!'  class='iconoTable activeTable'>Comercializador demo</a> `,
        "Promotor de vivienda - Inmobiliario",
        "Gerente de ventas",
        `<img src="../../imagenes/check.png" alt="Editar" width="20" height="20" />`,
        null,
      ],
      [
        `<a href='#!'  class='iconoTable activeTable'>Comercializador demo</a> `,
        "Promotor de vivienda - Inmobiliario",
        "Gerente de ventas",
        `<img src="../../imagenes/check.png" alt="Editar" width="20" height="20" />`,
        null,
      ],

    ];
  
    const t = $("#principal").DataTable({
      data: dataActivos,
      columns: [
        { title: "Asesor" },
        { title: "Contacto" },
        { title: "Ubicación" },
        { title: "Actividad" },
        {
          title: "Acción",
          defaultContent: `
              <button class="btn-editar"><img src="../../imagenes/iconoEditar.png" alt="Editar" width="20" height="20" /></button>
              <button class="btn-eliminar"><img src="../../imagenes/iconoEliminar.png" alt="Editar" width="20" height="20" /></button>
            `,
          orderable: false,
        },
      ],
      scrollX: true, 
      columnDefs: [
        {
          targets: 4,  
          className: "dt-center", // opcional, para centrar contenido
          // Puedes agregar estilos CSS aquí si quieres
        },
      ],
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
      },
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
    $("#principal tbody").on("click", ".btn-eliminar", function () {
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
    $("#principal tbody").on("click", ".btn-editar", function () {
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
  