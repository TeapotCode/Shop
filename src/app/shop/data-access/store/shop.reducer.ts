import { createReducer, on } from '@ngrx/store';
import { Product, ProductCategory } from '../../utils/product.interface';
import * as actions from './shop.action';

export interface ShopState {
  products: Product[];
  filter: ProductCategory[];
}

const initialState: ShopState = {
  products: [],
  filter: [],
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
  })
);
