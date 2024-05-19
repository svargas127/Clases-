class Producto {
    constructor(id, nombre, fecha, precioInicial) {
      this.id = id;
      this.nombre = nombre;
      this.fecha = fecha;
      this.precioInicial = precioInicial;
      this.ofertas = [];
    }
  
    agregarOferta(oferta) {
      this.ofertas.push(oferta);
    }
  
    obtenerOfertaGanadora() {
      if (this.ofertas.length === 0) {
        return null;
      }
      let ofertaGanadora = this.ofertas[0];
      for (let i = 1; i < this.ofertas.length; i++) {
        if (this.ofertas[i].valor > ofertaGanadora.valor) {
          ofertaGanadora = this.ofertas[i];
        }
      }
      return ofertaGanadora;
    }
  }
  
  class Oferta {
    constructor(fecha, producto, valor) {
      this.fecha = fecha;
      this.producto = producto;
      this.valor = valor;
    }
  }
  
  class Subasta {
    constructor() {
      this.productos = [];
    }
  
    registrarProducto(id, nombre, fecha, precioInicial) {
      const producto = new Producto(id, nombre, fecha, precioInicial);
      this.productos.push(producto);
      return producto;
    }
  
    hacerOferta(fecha, productoId, valor) {
      const producto = this.productos.find(p => p.id === productoId);
      if (!producto) {
        console.log("Producto no encontrado.");
        return;
      }
      const oferta = new Oferta(fecha, producto, valor);
      producto.agregarOferta(oferta);
      console.log(`Oferta de ${valor} realizada por el producto ${producto.nombre} el ${fecha}.`);
    }
  
    mostrarProductos() {
      console.log("Productos registrados en la subasta:");
      this.productos.forEach(producto => {
        console.log(`ID: ${producto.id}, Nombre: ${producto.nombre}, Precio inicial: ${producto.precioInicial}`);
      });
    }
  
    mostrarOfertasPorProducto(productoId) {
      const producto = this.productos.find(p => p.id === productoId);
      if (!producto) {
        console.log("Producto no encontrado.");
        return;
      }
      console.log(`Ofertas para el producto ${producto.nombre}:`);
      producto.ofertas.forEach(oferta => {
        console.log(`Fecha: ${oferta.fecha}, Valor: ${oferta.valor}`);
      });
    }
  
    seleccionarOfertaGanadora(productoId) {
      const producto = this.productos.find(p => p.id === productoId);
      if (!producto) {
        console.log("Producto no encontrado.");
        return;
      }
      const ofertaGanadora = producto.obtenerOfertaGanadora();
      if (!ofertaGanadora) {
        console.log("No hay ofertas para este producto.");
        return;
      }
      console.log(`La oferta ganadora para el producto ${producto.nombre} es de ${ofertaGanadora.valor} realizada el ${ofertaGanadora.fecha}.`);
    }
  }
  
  // Ejemplo de uso:
  const subasta = new Subasta();
  
  const producto1 = subasta.registrarProducto(1, "Cuadro", "2024-05-20", 100);
  const producto2 = subasta.registrarProducto(2, "Libro", "2024-05-21", 50);
  
  subasta.hacerOferta("2024-05-22", 1, 120);
  subasta.hacerOferta("2024-05-23", 1, 150);
  subasta.hacerOferta("2024-05-22", 2, 60);
  subasta.hacerOferta("2024-05-23", 2, 70);
  
  subasta.mostrarProductos();
  
  subasta.mostrarOfertasPorProducto(1);
  subasta.mostrarOfertasPorProducto(2);
  
  subasta.seleccionarOfertaGanadora(1);
  subasta.seleccionarOfertaGanadora(2);