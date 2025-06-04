import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-products',
  imports: [MatCardModule, MatButtonModule, MatRadioModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {

  productsService = inject(ProductService);
  cartService = inject(CartService)

  cartItems = this.cartService.cartItems;
  filteredProducts = this.productsService.filteredProducts;
  loading = this.productsService.loading;
  error = this.productsService.error

  men: string = "men's clothing"
  women: string = "women's clothing"

}
