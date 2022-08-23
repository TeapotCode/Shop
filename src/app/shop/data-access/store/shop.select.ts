import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shopReducerKey, ShopState } from './shop.reducer';

export const selectFeature = createFeatureSelector<ShopState>(shopReducerKey);

export const selectProducts = createSelector(
  selectFeature,
  (state) => state.products
);

export const selectFilteredProducts = createSelector(selectFeature, (state) => {
  if (!state.filter.length) return state.products;
  return state.products.filter((product) =>
    state.filter.includes(product.category)
  );
});

export const selectFilters = createSelector(
  selectFeature,
  (state) => state.filter
);

export const selectCartCount = createSelector(
  selectFeature,
  (state) => state.cart.length
);

export const selectCartCostSum = createSelector(selectFeature, (state) =>
  state.cart.reduce((prev, curr) => prev + curr.price, 0)
);

export const selectProductsInCart = createSelector(
  selectFeature,
  (state) => state.cart
);
