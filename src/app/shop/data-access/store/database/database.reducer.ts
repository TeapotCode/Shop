import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Product, ProductCategory } from 'src/app/shop/utils/product.interface';
import * as databaseActions from './database.action';

export interface DatabaseState {
  products: Product[];
  filters: ProductCategory[];
}

const initialState: DatabaseState = {
  products: [],
  filters: [],
};

export const databaseFeatureKey = 'database';

export const databaseReducer = createReducer(
  initialState,
  on(databaseActions.setDatabase, (state, { products }) => ({
    ...state,
    products: products.map((product) => ({ ...product, max: product.inStock })),
  })),

  on(databaseActions.toggleFilter, (state, { filter }) => {
    const newArray = state.filters.includes(filter)
      ? state.filters.filter((prod) => prod !== filter)
      : [...state.filters, filter];

    return {
      ...state,
      filters: newArray,
    };
  }),

  on(databaseActions.addToDatabase, (state, { product, count }) => {
    const products = state.products.find(
      (_product) => _product.id === product.id
    )
      ? state.products.map((_product) =>
          _product.id === product.id
            ? { ..._product, inStock: _product.inStock + count }
            : _product
        )
      : [...state.products, { ...product, inStock: count }];

    return { ...state, products };
  }),

  on(databaseActions.removeFromDatabase, (state, { product, count }) => {
    const products = state.products.map((_product) =>
      _product.id === product.id
        ? { ..._product, inStock: _product.inStock - count }
        : _product
    );

    return { ...state, products };
  }),

  on(databaseActions.resetDatabase, (state) => ({
    ...state,
    products: state.products.map((product) => ({
      ...product,
      inStock: product.max,
    })),
  })),

  on(databaseActions.resetMax, (state) => ({
    ...state,
    products: state.products.map((product) => ({
      ...product,
      max: product.inStock,
    })),
  }))
);
