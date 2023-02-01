export default class Eleccion {
  constructor() {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.votosElectronicos = [];
    this.alcaldeGanador = null;
    this.prefectoGanador = null;
    this.listaConsejalesGanadora = null;
  }

  establecerFechaInicio(fechaInicio) {
    this.fechaInicio = fechaInicio;
  }

  establecerFechaFin(fechaFin) {
    this.fechaFin = fechaFin;
  }

  agregarVotoElectronico(votoElectronico) {
    this.votosElectronicos.push(votoElectronico);
  }

  obtenerFechaInicio() {
    return this.fechaInicio;
  }

  obtenerFechaFin() {
    return this.fechaFin;
  }

  obtenerAcaldeGanador() {
    return this.alcaldeGanador;
  }

  obtenerPrefectoGanador() {
    return this.prefectoGanador;
  }

  obtenerListaConsejalesGanadora() {
    return this.listaConsejalesGanadora;
  }

  obtenerVotosValidos() {
    return this.votosElectronicos.filter((voto) => voto.esValido());
  }

  obtenerVotosBlancos() {
    return this.votosElectronicos.filter((voto) => voto.esBlanco());
  }
}