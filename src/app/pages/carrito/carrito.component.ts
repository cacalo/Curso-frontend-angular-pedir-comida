import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { Producto } from 'src/app/core/interfaces/productos';
import { ProductosService } from 'src/app/core/services/productos.service';
import { RouterModule } from '@angular/router';
import { PerfilService } from 'src/app/core/services/perfil.service';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.scss'],
    standalone: true,
    imports: [CommonModule, ContadorCantidadComponent, RouterModule]
})
export class CarritoComponent {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService);
  perfilService = inject(PerfilService);

  productosCarrito:Producto[]= [];

  subtotal = 0;
  delivery = 100;
  total = 0;


  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.cartService.carrito.forEach(async itemCarrito =>{
      const res = await this.productosService.getById(itemCarrito.idProducto)
      if(res) this.productosCarrito.push(res);
      this.calcularInformacion();
    })
  }

  eliminarProducto(idProducto:number){
    this.cartService.eliminarProducto(idProducto);
  }

  calcularInformacion (){
    this.subtotal = 0;
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      this.subtotal += this.productosCarrito[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.delivery;
  }

  cambiarCantidadProducto(id:number,cantidad:number){
    this.cartService.cambiarCantidadProducto(id,cantidad)
    this.calcularInformacion();
  }
}
