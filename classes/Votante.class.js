import Persona from "./Persona.class";

export default class Votante extends Persona {
  constructor(
    nombres,
    apellidos,
    fechaNacimiento,
    cedula,
    contrasenia,
    parroquia,
    genero
  ) {
    super(
      nombres,
      apellidos,
      fechaNacimiento,
      cedula,
      contrasenia,
      parroquia,
      genero
    );
    this.voto = false;
  }

  puedeVotar() {
    return !this.voto;
  }

  establecerVoto(voto) {
    this.voto = voto;
  }
}
