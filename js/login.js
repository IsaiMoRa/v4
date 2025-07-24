  // MOSTRAR CONTRASEÑA
  function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput) {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
    }
  }

  // SWEETALERT - MENSAJE DE ERROR
  function mostrarErrorLogin() {
    Swal.fire({
      icon: "error",
      title: "Usuario o contraseña incorrectos",
      text: "Verifica tus credenciales e intenta nuevamente.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#d33",
    }).then(() => {
      document.getElementById("usuario").value = "";
      document.getElementById("password").value = "";
    });
  }

  // USUARIO & CONTRASEÑA
  function loguear() {
    const usuarios = {
      admin: "acceso",
      usuario1: "acceso2",
      // puedes agregar más usuarios aquí
    };

    const user = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (usuarios[user] === pass) {
      window.location.href = "inicio.html";
    } else {
      mostrarErrorLogin();
    }
  }

  // CARGAR COMPONENTE DINÁMICO HTML 
  async function cargarComponente(ruta, idContenedor) {
    try {
      const rutaSinCache = `${ruta}?v=${new Date().getTime()}`;
      const response = await fetch(rutaSinCache);
      if (!response.ok) {
        throw new Error(`No se pudo cargar el componente: ${ruta} (status: ${response.status})`);
      }
      const html = await response.text();
      const contenedor = document.getElementById(idContenedor);
      if (contenedor) {
        contenedor.innerHTML = html;
      } else {
        console.error(`No se encontró el contenedor con id: "${idContenedor}"`);
      }
    } catch (error) {
      console.error("Error al cargar el componente:", error);
    }
  }

  // EJECUCIÓN AL CARGAR LA PÁGINA
  document.addEventListener("DOMContentLoaded", async () => {
    // COMPONENTE CONTRASEÑA
    await cargarComponente("componentes/contraseña.html", "componenteContraseña");


    // EVENTO MOSTRAR CONTASEÑA
    const toggleBtn = document.getElementById("togglePassword");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => togglePasswordVisibility("password"));
    }
  });