class Cliente {
    constructor(tipo, tieneCuenta) {
      this.tipo = tipo;
      this.tieneCuenta = tieneCuenta;
    }
  }
  
  class Turno {
    constructor(numero, tipoAtencion, tipoCliente) {
      this.numero = numero;
      this.tipoAtencion = tipoAtencion;
      this.tipoCliente = tipoCliente;
    }
  }
  
  class Banco {
    constructor() {
      this.cajas = {
        1: { tipoAtencion: "retiro", clienteAtendiendo: null },
        2: { tipoAtencion: "retiro", clienteAtendiendo: null },
        3: { tipoAtencion: "caja", clienteAtendiendo: null },
        4: { tipoAtencion: "caja", clienteAtendiendo: null },
        5: { tipoAtencion: "asesoria", clienteAtendiendo: null }
      };
      this.clientesEsperando = {
        preferencial: [],
        general: [],
        sinCuenta: []
      };
      this.turnosAtendidos = [];
      this.numeroTurnoActual = 1;
    }
  
    asignarTurno(cliente) {
      const turno = new Turno(this.numeroTurnoActual, this.obtenerTipoAtencion(cliente), cliente.tipo);
      this.numeroTurnoActual++;
  
      if (cliente.tipo === "preferencial") {
        this.clientesEsperando.preferencial.push(turno);
      } else if (cliente.tipo === "general") {
        this.clientesEsperando.general.push(turno);
      } else {
        this.clientesEsperando.sinCuenta.push(turno);
      }
  
      this.atenderClientes();
    }
  
    atenderClientes() {
      for (let i = 1; i <= 5; i++) {
        const caja = this.cajas[i];
        if (caja.clienteAtendiendo === null) {
          const cliente = this.obtenerClienteParaAtender();
          if (cliente !== null) {
            caja.clienteAtendiendo = cliente;
            this.turnosAtendidos.push(cliente);
          }
        }
      }
    }
  
    obtenerClienteParaAtender() {
      for (const tipo in this.clientesEsperando) {
        const cola = this.clientesEsperando[tipo];
        if (cola.length > 0) {
          return cola.shift();
        }
      }
      return null;
    }
  
    obtenerTipoAtencion(cliente) {
      if (cliente.tipo === "preferencial" || !cliente.tieneCuenta) {
        return "caja";
      } else {
        return "retiro";
      }
    }
  
    mostrarEstadoCajas() {
      console.log("Estado de las cajas:");
      for (let i = 1; i <= 5; i++) {
        const caja = this.cajas[i];
        console.log(`Caja ${i}: ${caja.clienteAtendiendo ? `Atendiendo cliente ${caja.clienteAtendiendo.numero}` : "Libre"}`);
      }
    }
  
    mostrarTurnosAtendidos() {
      console.log("Turnos atendidos:");
      this.turnosAtendidos.forEach(turno => {
        console.log(`Turno ${turno.numero}: Atención ${turno.tipoAtencion} - Cliente ${turno.tipoCliente}`);
      });
    }
  }
  
  // Ejemplo de uso:
  const banco = new Banco();
  
  // Clientes llegan al banco y se asignan turnos
  banco.asignarTurno(new Cliente("preferencial", true));
  banco.asignarTurno(new Cliente("general", false));
  banco.asignarTurno(new Cliente("general", true));
  banco.asignarTurno(new Cliente("sinCuenta", false));
  banco.asignarTurno(new Cliente("preferencial", false));
  banco.asignarTurno(new Cliente("sinCuenta", true));
  banco.asignarTurno(new Cliente("general", true));
  
  // Mostrar estado de las cajas y los turnos atendidos
  banco.mostrarEstadoCajas();
  banco.mostrarTurnosAtendidos();