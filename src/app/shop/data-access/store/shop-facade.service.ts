import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductCategory, ProductChange } from '../../utils/product.interface';
import {
  addProductToCart,
  buyProductsInCart,
  changeInCart,
  clearCart,
  removeFromCart,
} from './cart/cart.action';
import {
  selectCartCategories,
  selectCartCostSum,
  selectCartCount,
  selectCartProducts,
} from './cart/cart.select';
import { loadDatabase, toggleFilter } from './database/database.action';
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

  toggleFilter(filter: ProductCategory) {
    this.store.dispatch(toggleFilter({ filter }));
  }

  changeInCart(productChange: ProductChange) {
    this.store.dispatch(changeInCart(productChange));
  }

  buyCart() {
    this.store.dispatch(buyProductsInCart());
  }

  addToCart(productChange: ProductChange) {
    this.store.dispatch(addProductToCart(productChange));
  }

  removeFromCart(productChange: ProductChange) {
    this.store.dispatch(removeFromCart(productChange));
  }

  clearCart() {
    this.store.dispatch(clearCart());
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
