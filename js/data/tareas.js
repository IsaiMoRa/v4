$(function () {
  $("#componenteTareas").load("../componentes/modal/tareas.html", function () {
    // Solo después de que se cargue el modal, inicializamos DataTable
    const dataSet = [
      [
        "Tarea asignada: 01",
        "Prueba",
        "00001",
        "Roberto Araujo Soto",
        "Generar",
        "18/04/2025 03:09 pm",
        "Alta",
        "Vencida",
      ],
      [
        "Tarea asignada: 02",
        "Prueba",
        "00002",
        "Roberto Araujo Soto",
        "Generar",
        "18/04/2025 03:09 pm",
        "Alta",
        "Vencida",
      ],
      [
        "Tarea asignada: 03",
        "Prueba",
        "00003",
        "Roberto Araujo Soto",
        "Generar",
        "18/04/2025 03:09 pm",
        "Alta",
        "Vencida",
      ],
      [
        "Tarea asignada: 04",
        "Prueba",
        "00004",
        "Roberto Araujo Soto",
        "Generar",
        "18/04/2025 03:09 pm",
        "Alta",
        "Vencida",
      ],
    ];

    new DataTable("#tablaTareas", {
      columns: [
        { title: "Tarea" },
        { title: "Cliente" },
        { title: "Pedido" },
        { title: "Asesor" },
        { title: "Descripción" },
        { title: "Fecha vencimiento" },
        { title: "Importancia" },
        { title: "Avance" },
      ],
      data: dataSet,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
      },
    });
  });
});
