import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  template: `@if (product){
    <h2>{{product.title}}</h2>
  } @else {
    <p>Cargando...</p>
  }`,
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product: Product | undefined
  route = inject(ActivatedRoute)
  productsService = inject(ProductService)

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.productsService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data
      },
      error: (err) => {
        console.error("Error al cargar el producto", err)
      }
    })
  }
}
