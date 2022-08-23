import { createReducer, on } from '@ngrx/store';
import { Product, ProductCategory } from '../../utils/product.interface';
import * as actions from './shop.action';

export interface ShopState {
  products: Product[];
  filter: ProductCategory[];
  cart: Product[];
}

const initialState: ShopState = {
  products: [],
  filter: [],
  cart: [],
};

export const shopReducerKey = 'SHOP_REDUCER_KEY';

export const shopReducer = createReducer(
  initialState,
  on(actions.setProducts, (state, { products }) => ({ ...state, products })),
  on(actions.toggleFilter, (state, { filter }) => {
    let newArray = [];
    state.filter.includes(filter)
      ? (newArray = state.filter.filter((prod) => prod !== filter))
      : (newArray = [...state.filter, filter]);

    return {
      ...state,
      filter: newArray,
    };
  }),
  on(actions.addToCart, (state, { productId, count }) => {
    const products = state.products.map((product) => {
      if (product.id !== productId) return product;

      return {
        ...product,
        inStock: product.inStock - count,
      };
    });

    return {
      ...state,
      products,
    };
  })
);
