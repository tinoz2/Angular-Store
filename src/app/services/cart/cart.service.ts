import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  toastr = inject(ToastrService)

  private _cartItems = signal<CartItem[]>(this.loadCartFromStorage())
  private _ivaPercentage = signal<number>(0.21)

  ivaPercentage = this._ivaPercentage.asReadonly()
  cartItems = this._cartItems.asReadonly()

  constructor() {
    effect(() => {
      try {
        localStorage.setItem('cart', JSON.stringify(this._cartItems()))
      } catch (error) {
        console.error('Error saving cart', error)
      }
    })
  }

  addToCart(product: Product) {

    this._cartItems.update(items => {
      const existingItems = items.find(item => item.productId === product.id)
      this.toastr.success('Added to cart')

      if (existingItems) {
        return items.map(item => {
          return item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        })
      } else {
        return [...items,
        {
          productId: product.id,
          quantity: 1,
          price: product.price,
          title: product.title
        }]
      }
    })
  }

  clearCart() {
    this._cartItems.set([])
    localStorage.removeItem('cart')
  }

  loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  }

  increaseQuantity(productId: number) {
    this._cartItems.update(items => {
      const newQuantity = items.map(item => {
        return item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      })
      return newQuantity
    })
  }

  decreaseQuantity(productId: number) {
    this._cartItems.update(items => {
      const newQuantity = items.map(item => {
        return item.productId === productId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      })
      return newQuantity.filter(item => !(item.productId === productId && item.quantity === 0))
    })
  }

  subtotal = computed(() => {
    return this._cartItems().reduce(
      (sum, item) => sum + (item.quantity * item.price), 0
    )
  })

  calculateIVA = computed(() => {
    return this.subtotal() * this._ivaPercentage()
  })

  total = computed(() => {
    return this.subtotal() + this.calculateIVA()
  })
}
