import { createAction, props } from '@ngrx/store';
import {
  ProductCategory,
  ProductIn,
} from 'src/app/shop/utils/product.interface';

export const loadDatabase = createAction('[Database] Load request');

export const setDatabase = createAction(
  '[Database] Set database',
  props<{ products: ProductIn[] }>()
);

export const toggleFilter = createAction(
  '[Menu page] Toggle filter',
  props<{ filter: ProductCategory }>()
);
