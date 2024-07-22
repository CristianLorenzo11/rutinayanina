function mostrarTabla(dia) {
  // Ocultar todas las tablas
  var tablas = document.querySelectorAll('.tabla-rutina , .recomendacion, .informacion');
  tablas.forEach(function(tabla) {
    tabla.classList.remove('active');
  });

  // Mostrar solo la tabla del día seleccionado
  var tablaDia = document.getElementById('tabla-' + dia);
  if (tablaDia) {
    tablaDia.classList.add('active');
  }

  // Mostrar la información personal si se selecciona
  var infoPersonal = document.getElementById('info-personal');
  if (dia === 'informacion' && infoPersonal) {
    infoPersonal.classList.add('active');
    infoPersonal.scrollIntoView({ behavior: 'smooth' }); // Hacer scroll a la información personal
  } else {
    infoPersonal.classList.remove('active');
  }

  // Mostrar la recomendación si se selecciona
  var recomendacion = document.getElementById('recomendacion');
  if (dia === 'recomendacion' && recomendacion) {
    recomendacion.classList.add('active');
    recomendacion.scrollIntoView({ behavior: 'smooth' }); // Hacer scroll a la recomendación
  } else {
    recomendacion.classList.remove('active');
  }

  // Hacer scroll al contenido
  if (!infoPersonal.classList.contains('active') && !recomendacion.classList.contains('active')) {
    tablaDia.scrollIntoView({ behavior: 'smooth' });
  }


  var activacion = document.getElementById('activacion');

  // Manejar la activación de 'activacion'
  if (dia === 'activacion' && activacion) {
    activacion.classList.add('active');
    activacion.scrollIntoView({ behavior: 'smooth' }); // Hacer scroll a la activacion
  } else if (activacion) {
    activacion.classList.remove('active');
  }

  // Hacer scroll al contenido principal si no hay nada activo
  if (infoPersonal && !infoPersonal.classList.contains('active') && activacion && !activacion.classList.contains('active')) {
    tablaDia.scrollIntoView({ behavior: 'smooth' });
  }



}



document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('login-container');
    const content = document.getElementById('content');
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const password = loginForm.password.value;
  
      // Verificar si la contraseña es correcta (aquí puedes establecer tu propia lógica)
      if (password === '12345') {
        loginContainer.classList.add('hidden');
        content.classList.remove('hidden');
      } else {
        alert('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
      }
    });
  });
var temporizador; // Variable global para almacenar el identificador del temporizador
var tiempo = 60; // Tiempo inicial en segundos
var corriendo = false; // Variable para controlar si el temporizador está corriendo o pausado

function disminuirTiempo() {
    if (tiempo > 0) {
        tiempo--; // Disminuir el tiempo en 1 segundo
        actualizarVisualizacionTiempo(); // Actualizar la visualización del tiempo
    }
}

function incrementarTiempo() {
    tiempo++; // Incrementar el tiempo en 1 segundo
    actualizarVisualizacionTiempo(); // Actualizar la visualización del tiempo
}

function actualizarVisualizacionTiempo() {
    var minutos = Math.floor(tiempo / 60);
    var segundos = tiempo % 60;

    // Agregar un cero delante si los segundos son menores a 10
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
0
    // Actualizar el texto del temporizador
    document.getElementById("tiempo-restante").innerHTML = minutos + ":" + segundos;
}

function iniciarTemporizador() {
  var boton = document.getElementById("boton-temporizador");

  if (!corriendo) { // Si el temporizador no está corriendo, iniciarlo
      clearInterval(temporizador); // Limpiar cualquier temporizador anterior
      if (tiempo === 0) { // Si el tiempo es cero, reiniciar a 60 segundos
          tiempo = 60;
      }
      temporizador = setInterval(actualizarTemporizador, 1000); // Iniciar el temporizador
      corriendo = true; // Actualizar el estado a corriendo
      boton.innerHTML = "Pausar"; // Cambiar el texto del botón a "Pausar"
  } else { // Si el temporizador está corriendo, pausarlo
      clearInterval(temporizador); // Detener el temporizador
      corriendo = false; // Actualizar el estado a pausado
      boton.innerHTML = "Reanudar"; // Cambiar el texto del botón a "Reanudar"
  }
}


function actualizarTemporizador() {
    if (tiempo > 0) {
        tiempo--; // Disminuir el tiempo en 1 segundo
        actualizarVisualizacionTiempo(); // Actualizar la visualización del tiempo
    } else {
        clearInterval(temporizador); // Detener el temporizador cuando el tiempo llegue a cero
        corriendo = false; // Actualizar el estado a pausado
        document.getElementById("boton-temporizador").innerHTML = "Iniciar"; // Cambiar el texto del botón a "Iniciar"
    }
}

  function toggleMenu() {
    var menu = document.querySelector('.botones-dias');
    menu.classList.toggle('active');
  }
  var temporizadorentreejercicios;
  var tiempoLimite = 10 * 60 * 1000; // 8 minutos en milisegundos
  
  function marcarEjercicio(id) {
      clearTimeout(temporizadorentreejercicios); // Reiniciar el temporizadorentreejercicios cada vez que se marque un ejercicio
      var ejercicio = document.getElementById(id);
      if (ejercicio.checked) {
          ejercicio.parentNode.parentNode.classList.add('completado');
      } else {
          ejercicio.parentNode.parentNode.classList.remove('completado');
      }
      temporizadorentreejercicios = setTimeout(function() {
          mostrarAlertaentreejercicio(); // Llamada a la función para mostrar la alerta si pasa el tiempo límite
      }, tiempoLimite);
      verificarLunesCompleto(); // Llamar a la función para verificar si el día está completo
      verificarMartesCompleto();
      verificarMiercolesCompleto();
      verificarJuevesCompleto();
      verificarViernesCompleto();
  }
  
  function mostrarAlerta() {
      document.getElementById("overlay").style.display = "block";
  }
  
  function mostrarAlertaentreejercicio() {
    document.getElementById("alertaentreejercicio").style.display = "block";
}
  function cerrarAlerta() {
      document.getElementById("alertaentreejercicio").style.display = "none"; // Ocultar la alerta
  }
  
  function verificarLunesCompleto() {
    var ejerciciosDelDia = document.querySelectorAll('#tabla-lunes .marcado-ejercicio input[type="checkbox"]');
    var todosCompletados = true;
    ejerciciosDelDia.forEach(function(ejercicio) {
        if (!ejercicio.checked) {
            todosCompletados = false;
            return;
        }
    });
    if (todosCompletados) {
      // Obtener la fecha actual
      var today = new Date();
  
      // Obtener el número del día de la semana (0 para Domingo, 1 para Lunes, ..., 6 para Sábado)
      var dayOfWeek = today.getDay();
  
      // Crear un array con los nombres de los días de la semana
      var daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
      // Obtener el nombre del día de la semana actual
      var dayName = daysOfWeek[dayOfWeek];
  
      // Mensaje con el día de la semana actual
      var message = "<p>¡Felicidades Yani !<br> Completaste todos los <br> ejercicios del día " + dayName + ".<br> Podés volver a casa feliz.</p>";
  
      // Mostrar overlay con el mensaje que incluye el día de la semana
      document.getElementById("overlay").style.display = "block";
      document.getElementById("overlay").innerHTML = message;
      document.getElementById("alertaentreejercicio").style.display = "none"; // Ocultar la alerta
  }
  
}

function verificarMartesCompleto() {
    var ejerciciosDelDia = document.querySelectorAll('#tabla-martes .marcado-ejercicio input[type="checkbox"]');
    var todosCompletados = true;
    ejerciciosDelDia.forEach(function(ejercicio) {
        if (!ejercicio.checked) {
            todosCompletados = false;
            return;
        }
    });
    if (todosCompletados) {
      // Obtener la fecha actual
      var today = new Date();
  
      // Obtener el número del día de la semana (0 para Domingo, 1 para Lunes, ..., 6 para Sábado)
      var dayOfWeek = today.getDay();
  
      // Crear un array con los nombres de los días de la semana
      var daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
      // Obtener el nombre del día de la semana actual
      var dayName = daysOfWeek[dayOfWeek];
  
      // Mensaje con el día de la semana actual
      var message = "<p>¡Felicidades Yani !<br> Completaste todos los <br> ejercicios del día (" + dayName + ").<br> Podés volver a casa feliz.</p>";
  
      // Mostrar overlay con el mensaje que incluye el día de la semana
      document.getElementById("overlay").style.display = "block";
      document.getElementById("overlay").innerHTML = message;
      document.getElementById("alertaentreejercicio").style.display = "none"; // Ocultar la alerta
  }
  }
function verificarMiercolesCompleto() {
  var ejerciciosDelDia = document.querySelectorAll('#tabla-miercoles .marcado-ejercicio input[type="checkbox"]');
  var todosCompletados = true;
  ejerciciosDelDia.forEach(function(ejercicio) {
      if (!ejercicio.checked) {
          todosCompletados = false;
          return;
      }
  });
  if (todosCompletados) {
    // Obtener la fecha actual
    var today = new Date();

    // Obtener el número del día de la semana (0 para Domingo, 1 para Lunes, ..., 6 para Sábado)
    var dayOfWeek = today.getDay();

    // Crear un array con los nombres de los días de la semana
    var daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Obtener el nombre del día de la semana actual
    var dayName = daysOfWeek[dayOfWeek];

    // Mensaje con el día de la semana actual
    var message = "<p>¡Felicidades Yani !<br> Completaste todos los <br> ejercicios del día " + dayName + ".<br> Podés volver a casa feliz.</p>";

    // Mostrar overlay con el mensaje que incluye el día de la semana
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").innerHTML = message;
    document.getElementById("alertaentreejercicio").style.display = "none"; // Ocultar la alerta
}
}

function verificarJuevesCompleto() {
  var ejerciciosDelDia = document.querySelectorAll('#tabla-jueves .marcado-ejercicio input[type="checkbox"]');
  var todosCompletados = true;
  ejerciciosDelDia.forEach(function(ejercicio) {
      if (!ejercicio.checked) {
          todosCompletados = false;
          return;
      }
  });
  if (todosCompletados) {
    // Obtener la fecha actual
    var today = new Date();

    // Obtener el número del día de la semana (0 para Domingo, 1 para Lunes, ..., 6 para Sábado)
    var dayOfWeek = today.getDay();

    // Crear un array con los nombres de los días de la semana
    var daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Obtener el nombre del día de la semana actual
    var dayName = daysOfWeek[dayOfWeek];

    // Mensaje con el día de la semana actual
    var message = "<p>¡Felicidades Yani !<br> Completaste todos los <br> ejercicios del día " + dayName + ".<br> Podés volver a casa feliz.</p>";

    // Mostrar overlay con el mensaje que incluye el día de la semana
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").innerHTML = message;
    document.getElementById("alertaentreejercicio").style.display = "none"; // Ocultar la alerta
}
}

function verificarViernesCompleto() {
  var ejerciciosDelDia = document.querySelectorAll('#tabla-viernes .marcado-ejercicio input[type="checkbox"]');
  var todosCompletados = true;
  ejerciciosDelDia.forEach(function(ejercicio) {
      if (!ejercicio.checked) {
          todosCompletados = false;
          return;
      }
  });
  if (todosCompletados) {
    // Obtener la fecha actual
    var today = new Date();

    // Obtener el número del día de la semana (0 para Domingo, 1 para Lunes, ..., 6 para Sábado)
    var dayOfWeek = today.getDay();

    // Crear un array con los nombres de los días de la semana
    var daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Obtener el nombre del día de la semana actual
    var dayName = daysOfWeek[dayOfWeek];

    // Mensaje con el día de la semana actual
    var message = "<p>¡Felicidades Yani !<br> Completaste todos los <br> ejercicios del día " + dayName + ".<br> Podés volver a casa feliz.</p>";

    // Mostrar overlay con el mensaje que incluye el día de la semana
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").innerHTML = message;
    document.getElementById("alertaentreejercicio").style.display = "none"; // Ocultar la alerta
}
}
