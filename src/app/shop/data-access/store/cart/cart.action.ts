import { createAction, props } from '@ngrx/store';
import { ProductChange } from 'src/app/shop/utils/product.interface';

export const addToCart = createAction(
  '[Cart] Add to cart',
  props<ProductChange>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from cart',
  props<ProductChange>()
);

export const clearCart = createAction('[Cart] Clear cart');
