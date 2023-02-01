import Persona from "./Persona.class";

export default class Candidato extends Persona {
  constructor(
    nombres,
    apellidos,
    fechaNacimiento,
    cedula,
    contrasenia,
    parroquia,
    genero,
    dignidad,
    lista
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
    this.dignidad = dignidad;
    this.lista = lista;
  }

  obtenerTipoDignidad() {
    return this.dignidad;
  }

  obtenerLista() {
    return this.lista;
  }
}
