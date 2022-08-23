import { createAction, props } from '@ngrx/store';
import {
  Product,
  ProductCategory,
  ProductChange,
} from '../../utils/product.interface';

export const loadProducts = createAction('[Shop] Load Products');

export const setProducts = createAction(
  '[Shop] Set Products',
  props<{ products: Product[] }>()
);

export const toggleFilter = createAction(
  '[Shop] Toggle Filter',
  props<{ filter: ProductCategory }>()
);

export const addToCart = createAction(
  '[Shop] Add Product To Cart',
  props<ProductChange>()
);

export const removeFromCart = createAction(
  '[Shop] Remove Product From Cart',
  props<ProductChange>()
);
