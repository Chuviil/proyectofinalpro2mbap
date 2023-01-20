export default class Persona {
  constructor(nombres, apellidos, fechaNacimiento, genero) {
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;
    this.genero = genero;
  }

  obtenerNombreCompleto() {
    return this.nombres.join(" ") + " " + this.apellidos.join(" ");
  }

  obtenerNombres() {
    return this.nombres;
  }

  obtenerApellidos() {
    return this.apellidos;
  }

  obtenerFechaNacimiento() {
    return this.fechaNacimiento;
  }

  obtenerGenero() {
    return this.genero;
  }
}