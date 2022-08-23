import { createReducer, on } from '@ngrx/store';
import {
  Product,
  ProductCategory,
  ProductInCart,
} from '../../utils/product.interface';
import * as actions from './shop.action';

export interface ShopState {
  products: Product[];
  filter: ProductCategory[];
  cart: ProductInCart[];
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
  on(actions.addToCart, (state, { product, count }) => {
    const selectedProduct = state.products.find(
      (_product) => _product.id === product.id
    );

    //removing inStock from main page
    const products: Product[] = state.products.map((_product) => {
      if (_product.id !== product.id) return _product;
      return {
        ..._product,
        inStock: _product.inStock - count,
      };
    });

    //adding to cart

    if (state.cart.find((_product) => _product.id === product.id)) {
      const cart = state.cart.map((_product) => {
        if (_product.id !== product.id) return _product;
        return {
          ..._product,
          inStock: _product.inStock + count,
        };
      });

      return {
        ...state,
        products,
        cart,
      };
    }

    return {
      ...state,
      products,
      cart: [
        ...state.cart,
        { ...selectedProduct, inStock: count } as ProductInCart,
      ],
    };
  }),
  on(actions.removeFromCart, (state, { product, count }) => {
    const cart = state.cart.filter((_product) => _product.id !== product.id);

    const products = state.products.map((_product) =>
      _product.id === product.id
        ? { ..._product, inStock: _product.inStock + count }
        : _product
    );

    return {
      ...state,
      cart,
      products,
    };
  })
);
