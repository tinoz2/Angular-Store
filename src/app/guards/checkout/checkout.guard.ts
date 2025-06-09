import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

export const checkoutGuard: CanActivateFn = (route, state) => {

  const cart = inject(CartService)
  const router = inject(Router)
  const items = cart.cartItems()

  if (items && items.length > 0){
    return true
  }
  else{
    router.navigate(['/products'])
    return false
  }
};
