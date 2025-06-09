import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { apiKey } from '../../config/api';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products = signal<Product[]>([])
  private _loading = signal<boolean>(false)
  private _error = signal<string | null>(null)
  private _selectedCategory = signal<string>('all')
  private _http = inject(HttpClient)

  products = this._products.asReadonly()
  loading = this._loading.asReadonly()
  error = this._error.asReadonly()
  selectedCategory = this._selectedCategory.asReadonly()

  constructor(){
    this.fetchData()
  }

  fetchData(){
    this._loading.set(true)
    this._http.get<Product[]>(apiKey)
    .subscribe({
      next: (data) => {
        this._products.set(data);
        this._loading.set(false)
      },
      error: () => {
        this._error.set('No se encontraron productos');
        this._loading.set(false)
      },
    })
  }

  filteredProducts = computed(() => {
    return this._selectedCategory() === 'all'
    ? this.products()
    : this._products().filter((product) => product.category == this._selectedCategory())
  })

  setCategory(category: string){
    this._selectedCategory.set(category)
  }

  getProductById(id: Params){
    return this._http.get<Product>(`${apiKey}/${id}`)
  }
}
