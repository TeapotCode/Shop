import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../utils/product.interface';
import * as cartActions from './cart.action';

export interface CartState {
  cart: Product[];
}

export const initialState: CartState = {
  cart: [],
};

export const cartFeatureKey = 'cart';

export const cartReducer = createReducer(
  initialState,
  on(cartActions.addProductToCart, (state, { product, count }) => {
    const cart = state.cart.find((_product) => _product.id === product.id)
      ? state.cart.map((_product) =>
          _product.id === product.id
            ? { ..._product, inStock: _product.inStock + count }
            : _product
        )
      : [...state.cart, { ...product, inStock: count }];

    return { ...state, cart };
  }),
  on(cartActions.removeFromCart, (state, { product }) => {
    const cart = state.cart.filter((_product) => _product.id !== product.id);

    return { ...state, cart };
  }),
  on(cartActions.buyProductsInCart, (state) => ({ ...state, cart: [] })),
  on(cartActions.changeInCart, (state, { product, count }) => {
    const cart = state.cart.map((_product) =>
      _product.id === product.id
        ? { ..._product, inStock: _product.inStock + count }
        : _product
    );

    return {
      ...state,
      cart,
    };
  }),
  on(cartActions.clearCart, (state) => ({ ...state, cart: [] }))
);
