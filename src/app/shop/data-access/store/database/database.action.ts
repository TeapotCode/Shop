import { createAction, props } from '@ngrx/store';
import {
  ProductCategory,
  ProductChange,
  ProductIn,
} from 'src/app/shop/utils/product.interface';

export const loadDatabase = createAction('[Database] Load request');

export const setDatabase = createAction(
  '[Database] Set database',
  props<{ products: ProductIn[] }>()
);

export const addToDatabase = createAction(
  '[Database] Add to dabase',
  props<ProductChange>()
);

export const removeFromDatabase = createAction(
  '[Database] Remove from database',
  props<ProductChange>()
);

export const resetDatabase = createAction('[Database] Reset database');

export const toggleFilter = createAction(
  '[Database] Toggle filter',
  props<{ filter: ProductCategory }>()
);

export const resetMax = createAction('[Database] Reset max values');
