import Persona from "./Persona.class";

export default class Votante extends Persona {
  constructor(
    nombres,
    apellidos,
    fechaNacimiento,
    cedula,
    contrasenia,
    parroquia,
    genero,
    voto
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
    this.voto = voto;
  }

  puedeVotar() {
    return !this.voto;
  }
}
