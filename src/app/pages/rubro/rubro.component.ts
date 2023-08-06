import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TarjetaArticuloComponent } from 'src/app/core/components/tarjeta-articulo/tarjeta-producto.component';
import { Producto } from 'src/app/core/interfaces/productos';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from 'src/app/core/services/productos.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss'],
  standalone: true,
  imports: [TarjetaArticuloComponent, CommonModule, RouterModule]
})
export class RubroComponent {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  categoriasService = inject(CategoriasService);
  ac = inject(ActivatedRoute);
  productos:Producto[] = []


  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      if(params['id']){
        this.categoriasService.getById(parseInt(params['id']))
        .then(categoria =>{
          if(categoria) {
            this.productos = categoria.productos;
            this.headerService.titulo.set(categoria.nombre);
          }})
      }
    })
    //
  }
}
