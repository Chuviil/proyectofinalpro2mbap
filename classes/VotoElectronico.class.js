export default class VotoElectronico {
  constructor(
    candidatoAlcalde,
    candidatoPrefecto,
    listaConsejales,
    fechaVotacion,
    parroquia
  ) {
    this.candidatoAlcalde = candidatoAlcalde;
    this.candidatoPrefecto = candidatoPrefecto;
    this.listaConsejales = listaConsejales;
    this.fechaVotacion = fechaVotacion;
    this.parroquia = parroquia;
  }
}
