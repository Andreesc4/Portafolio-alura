const inputs = document.querySelectorAll(".formcontato__input, .formcontato__textarea");

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    valida(input);
  });
});

const validadores = {
  nombre: (input) => {
    return input.value.trim().length > 0;
  },
  email: (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
  },
  asunto: (input) => {
    return input.value.trim().length > 0;
  },
  mensaje: (input) => {
    return input.value.trim().length > 0;
  },
};

function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  const validador = validadores[tipoDeInput];
  if (validador && !validador(input)) {
    muestraError(input, tipoDeInput);
  } else {
    ocultaError(input);
  }
}

function muestraError(input, tipoDeInput) {
  const tipoDeErrores = ["valueMissing", "typeMismatch", "patternMismatch"];
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      const mensaje = mensajesDeError[tipoDeInput][error];
      input.parentElement.classList.add("formcontato__campo--invalid");
      input.parentElement.querySelector(".formcontato__error").innerHTML = mensaje;
    }
  });
}

function ocultaError(input) {
  input.parentElement.classList.remove("formcontato__campo--invalid");
  input.parentElement.querySelector(".formcontato__error").innerHTML = "";
}

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo no puede estar vacio",
  },
  email: {
    valueMissing: "Este campo no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  asunto: {
    valueMissing: "Este campo no puede estar vacio",
  },
  mensaje: {
    valueMissing: "Este campo no puede estar vacio",
  },
};