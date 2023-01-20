import Persona from "./Persona.class";
import Candidato from "./Candidato.class";

export default class Usuario extends Persona {
  constructor(
    nombres,
    apellidos,
    cedula,
    candidato,
    fechaNacimiento,
    genero,
    voto,
    contrasenia
  ) {
    super(nombres, apellidos, fechaNacimiento, genero);
    this.cedula = cedula;
    if (candidato)
      candidato = new Candidato(candidato.dignidad, candidato.votos);
    this.candidato = candidato;
    this.contrasenia = contrasenia;
    this.voto = voto;
  }

  obtenerCedula() {
    return this.cedula;
  }
  obtenerCandidato() {
    return this.candidato;
  }
  yaVoto() {
    return this.voto;
  }
}
