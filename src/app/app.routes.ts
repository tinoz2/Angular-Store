import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { SuccessComponent } from './components/mercadopago/success/success.component';
import { FailureComponent } from './components/mercadopago/failure/failure.component';
import { AuthComponent } from './components/auth/auth.component';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './guards/auth/auth.guard';
import { checkoutGuard } from './guards/checkout/checkout.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [checkoutGuard] },
    { path: 'cart', component: CartComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'success', component: SuccessComponent },
    { path: 'failure', component: FailureComponent },
    { path: 'user', component: UserComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
