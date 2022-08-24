import { createAction, props } from '@ngrx/store';
import { ProductChange } from 'src/app/shop/utils/product.interface';

export const addProductToCart = createAction(
  '[Menu page] Add to cart',
  props<ProductChange>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from cart',
  props<ProductChange>()
);

export const clearCart = createAction('[Cart] Clear cart');

export const changeInCart = createAction(
  '[Cart] Change product in cart',
  props<ProductChange>()
);

export const buyProductsInCart = createAction('[Cart] Buy products in cart');
