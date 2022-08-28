import { createReducer, on } from '@ngrx/store';

import * as cartActions from '../cart/cart.action';
import * as databaseActions from './database.action';
import { Product, ProductCategory } from '../../../utils/product.interface';

export interface DatabaseState {
  products: Product[];
  filters: Set<ProductCategory>;
}

const initialState: DatabaseState = {
  products: [
    {
      id: 1,
      name: 'Ślimaki w serze',
      stars: 4,
      inStock: 25,
      imgName: 'snails.jpeg',
      price: 17,
      category: ProductCategory.SNAILS,
      max: 25,
    },
    {
      id: 2,
      name: 'Ślimaki w maśle',
      stars: 4,
      inStock: 13,
      imgName: 'snails.jpeg',
      price: 12,
      category: ProductCategory.SNAILS,
      max: 13,
    },
    {
      id: 3,
      name: 'Ślimaki w śmietanie',
      stars: 3,
      inStock: 0,
      imgName: 'snails.jpeg',
      price: 20,
      category: ProductCategory.SNAILS,
      max: 0,
    },
    {
      id: 4,
      name: 'Ślimaki wg przepisu cioci',
      stars: 2,
      inStock: 10,
      imgName: 'snails.jpeg',
      price: 12,
      category: ProductCategory.SNAILS,
      max: 10,
    },
    {
      id: 5,
      name: 'Ślimaki zwykłe',
      stars: 5,
      inStock: 30,
      imgName: 'snails.jpeg',
      price: 10,
      category: ProductCategory.SNAILS,
      max: 30,
    },
    {
      id: 6,
      name: 'Żaba zwykła',
      stars: 4,
      inStock: 2,
      imgName: 'frogs.jpeg',
      price: 30,
      category: ProductCategory.FROGS,
      max: 2,
    },
    {
      id: 7,
      name: 'Żaba w czekoladzie',
      stars: 5,
      inStock: 5,
      imgName: 'frogs.jpeg',
      price: 24,
      category: ProductCategory.FROGS,
      max: 5,
    },
    {
      id: 8,
      name: 'Żaba z wybiegu',
      stars: 2,
      inStock: 3,
      imgName: 'frogs.jpeg',
      price: 10,
      category: ProductCategory.FROGS,
      max: 3,
    },
    {
      id: 9,
      name: 'Bagietka na zimno',
      stars: 3,
      inStock: 20,
      imgName: 'baguette.jpeg',
      price: 5,
      category: ProductCategory.BAGUETTES,
      max: 20,
    },
    {
      id: 10,
      name: 'Bagietka na ciepło',
      stars: 4,
      inStock: 20,
      imgName: 'baguette.jpeg',
      price: 5,
      category: ProductCategory.BAGUETTES,
      max: 20,
    },
    {
      id: 11,
      name: 'Bagietka z masłem czosnkowym',
      stars: 5,
      inStock: 2,
      imgName: 'baguette.jpeg',
      price: 8,
      category: ProductCategory.BAGUETTES,
      max: 2,
    },
  ],
  filters: new Set(),
};

export const databaseFeatureKey = 'database';

export const databaseReducer = createReducer(
  initialState,

  on(databaseActions.toggleFilter, (state, { filter }) => {
    const newState = new Set(state.filters);

    state.filters.has(filter) ? newState.delete(filter) : newState.add(filter);

    return {
      ...state,
      filters: newState,
    };
  }),

  on(cartActions.removeFromCart, (state, { product, count }) => {
    const products = state.products.map((_product) =>
      _product.id === product.id
        ? { ..._product, inStock: _product.inStock + count }
        : _product
    );

    return { ...state, products };
  }),

  on(cartActions.addProductToCart, (state, { product, count }) => {
    const products = state.products.map((_product) =>
      _product.id === product.id
        ? { ..._product, inStock: _product.inStock - count }
        : _product
    );

    return { ...state, products };
  }),

  on(cartActions.changeInCart, (state, { product, count }) => {
    const products = state.products.map((_product) =>
      _product.id === product.id
        ? { ..._product, inStock: _product.inStock - count }
        : _product
    );

    return { ...state, products };
  }),

  on(cartActions.clearCart, (state) => ({
    ...state,
    products: state.products.map((product) => ({
      ...product,
      inStock: product.max,
    })),
  })),

  on(cartActions.buyProductsInCart, (state) => ({
    ...state,
    products: state.products.map((product) => ({
      ...product,
      max: product.inStock,
    })),
  }))
);
