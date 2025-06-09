import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { backendApi } from '../../config/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private http = inject(HttpClient)
  private toastr = inject(ToastrService)

  cart = this.cartService.cartItems()

  checkoutForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  onSubmit() {

    return this.http.post(backendApi,
      { cart: this.cart },
      )
      .subscribe({
        next: (response) => {
          this.toastr.success('Redirigiendo a Mercado Pago')
          window.location.href = response.toLocaleString()
        },
        error: (error) => {
          this.toastr.error('Error al enviar tus datos')
          console.log(error)
        }
      })
  }
}
