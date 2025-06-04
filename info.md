**Básicos y conceptos de la app e-commerce**

---

## 1. Estructura y Tipado

* **Carpetas organizadas**: Cada módulo (componentes, servicios, modelos) en su propia carpeta para mantener la coherencia y facilitar el mantenimiento.
* **Interfaces TypeScript**: Definen estructuras como `Product` y `CartItem` para asegurar un tipado fuerte en toda la aplicación.

---

## 2. Estado Global con Signals

* **Services basados en Signals**:

  * Los servicios exponen propiedades sólo lectura (`asReadonly()`) y usan `signal` para actualizar internamente.
  * Ejemplo: el `CartService` mantiene un arreglo de `CartItem[]` y recalcula subtotal, IVA y total automáticamente.

```typescript
private _cartItems = signal<CartItem[]>(this.loadCartFromStorage());
cartItems = this._cartItems.asReadonly();

addToCart(product: Product) {
  this._cartItems.update(items => {
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
      return items.map(i =>
        i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    this.toastr.success('Agregado al carrito');
    return [...items, { productId: product.id, quantity: 1, price: product.price, title: product.title }];
  });
}
```

* **Persistencia en localStorage**: Un `effect` escucha cambios en `_cartItems` y guarda automáticamente al usuario.

---

## 3. Autenticación con Auth0

* **AuthComponent**: Inyecta `AuthService` de `@auth0/auth0-angular` para métodos simples de `login()` y `logout()`.
* **Compatibilidad SSR**: Se define un “mock” de `AuthService` cuando la app corre en servidor para evitar errores de renderizado.

```typescript
const provideMockAuthService: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: AuthService, useValue: {} }
  ]
};
```

---

## 4. Pago con MercadoPago + Firebase Functions

* **Flujo en el Frontend**:

  1. Se arma el carrito (`CartService.cartItems()`).
  2. En `CheckoutComponent`, el usuario ingresa su correo y manda `POST` al backend con `{ cart }`.
  3. El backend responde con una URL de MercadoPago y se redirige automáticamente.

```typescript
constructor(...) {
  this.cart = this.cartService.cartItems();
  this.checkoutForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(13)]]
  });
}

onSubmit() {
  this.http.post<string>(backendApi, { cart: this.cart })
    .subscribe({
      next: url => {
        this.toastr.success('Redirigiendo a Mercado Pago');
        window.location.href = url;
      },
      error: () => this.toastr.error('Error al procesar pago')
    });
}
```

* **Backend ligero con Firebase Functions**:

  * Sin servidor Express completo.
  * Se configura MercadoPago para crear una preferencia de pago (productos, precios, cantidades).
  * Se devuelve la URL de checkout al frontend.

---

## 5. Formularios (FormBuilder)

* **Uso de ReactiveFormsModule**:

  * Se crea un `FormGroup` con validaciones (`Validators.required`, `Validators.email`, `Validators.minLength`).
  * Métodos como `dirty` y `touched` permiten detectar interacción del usuario y mostrar errores sólo cuando el campo ha sido modificado.

```typescript
checkoutForm = this.fb.group({
  email: ['', [Validators.required, Validators.email, Validators.minLength(13)]]
});
```

---

## 6. Fetch API (HttpClient)

* **Obtención de Productos (GET)**
  En `ProductService`, el método `fetchData()` hace un `GET` a `apiKey` para cargar todos los productos al inicializar:

```typescript
constructor(private http: HttpClient) {
  this.fetchData();
}

fetchData() {
  this._loading.set(true);
  this.http.get<Product[]>(apiKey)
    .subscribe({
      next: data => {
        this._products.set(data);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('No se encontraron productos');
        this._loading.set(false);
      }
    });
}
```

* **Filtrado Local de Categorías**
  Con un `signal` de categoría, `filteredProducts` devuelve todos o sólo los de la categoría seleccionada:

```typescript
filteredProducts = computed(() => {
  return this._selectedCategory() === 'all'
    ? this.products()
    : this._products().filter(p => p.category === this._selectedCategory());
});

setCategory(category: string) {
  this._selectedCategory.set(category);
}
```

* **Envío de Carrito para Pago (POST)**
  Ya explicado en el apartado de MercadoPago: se envía `POST` con `{ cart }` a `backendApi`, y el backend retorna la URL de checkout.

---

### Resumen de ventajas

1. **Tipado y organización** reducen errores y facilitan el trabajo en equipo.
2. **Signals + Toastr** ofrecen un estado reactivo y notificaciones inmediatas.
3. **Auth0** agiliza el login/logout y, con el “mock” para SSR, no bloquea la renderización.
4. **Firebase Functions + MercadoPago** permiten integrar pagos sin un backend monolítico.
5. **HttpClient (fetch API)** gestiona tanto la obtención de productos como el envío del carrito para pago.
6. **FormBuilder** asegura formularios robustos y validaciones sencillas.