import { createAction, props } from '@ngrx/store';
import { ProductCategory } from 'src/app/shop/utils/product.interface';

export const loadDatabase = createAction('[Database API] Load products');

export const toggleFilter = createAction(
  '[Menu page] Toggle filter',
  props<{ filter: ProductCategory }>()
);
