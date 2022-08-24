import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductCategory, ProductChange } from '../../utils/product.interface';
import { addToCart, clearCart, removeFromCart } from './cart/cart.action';
import {
  selectCartCategories,
  selectCartCostSum,
  selectCartCount,
  selectCartProducts,
} from './cart/cart.select';
import {
  addToDatabase,
  loadDatabase,
  removeFromDatabase,
  resetDatabase,
  resetMax,
  toggleFilter,
} from './database/database.action';
import {
  selectDatabase,
  selectDatabaseFiltered,
  selectFilters,
} from './database/database.select';

@Injectable({
  providedIn: 'root',
})
export class ShopFacadeService {
  constructor(private store: Store) {}

  loadDatabase() {
    this.store.dispatch(loadDatabase());
  }

  buyCart() {
    this.store.dispatch(clearCart());
    this.store.dispatch(resetMax());
  }

  toggleFilter(filter: ProductCategory) {
    this.store.dispatch(toggleFilter({ filter }));
  }

  addToCart(productChange: ProductChange) {
    this.store.dispatch(addToCart(productChange));
    this.store.dispatch(removeFromDatabase(productChange));
  }

  removeFromCart(productChange: ProductChange) {
    this.store.dispatch(removeFromCart(productChange));
    this.store.dispatch(addToDatabase(productChange));
  }

  clearCart() {
    this.store.dispatch(clearCart());
    this.store.dispatch(resetDatabase());
  }

  get database$() {
    return this.store.select(selectDatabase);
  }

  get filters$() {
    return this.store.select(selectFilters);
  }

  get databaseFiltered$() {
    return this.store.select(selectDatabaseFiltered);
  }

  get cartCost$() {
    return this.store.select(selectCartCostSum);
  }

  get cartCount$() {
    return this.store.select(selectCartCount);
  }

  get cart$() {
    return this.store.select(selectCartProducts);
  }

  get categoriesInCart$() {
    return this.store.select(selectCartCategories);
  }
}
