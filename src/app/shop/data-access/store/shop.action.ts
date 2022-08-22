import { createAction, props } from '@ngrx/store';
import { Product, ProductCategory } from '../../utils/product.interface';

export const loadProducts = createAction('[Shop] Load Products');

export const setProducts = createAction(
  '[Shop] Set Products',
  props<{ products: Product[] }>()
);

export const toggleFilter = createAction(
  '[Shop] Toggle Filter',
  props<{ filter: ProductCategory }>()
);
