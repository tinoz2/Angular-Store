import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService)

  cartItems = this.cartService.cartItems
  subtotal = this.cartService.subtotal
  total = this.cartService.total
}
