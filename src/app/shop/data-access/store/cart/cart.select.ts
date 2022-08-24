import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartFeatureKey, CartState } from './cart.reducer';

export const selectFeature = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCartProducts = createSelector(
  selectFeature,
  (state) => state.cart
);

export const selectCartCostSum = createSelector(selectFeature, (state) =>
  state.cart.reduce((prev, curr) => prev + curr.price * curr.inStock, 0)
);

export const selectCartCount = createSelector(selectFeature, (state) =>
  state.cart.reduce((prev, curr) => prev + curr.inStock, 0)
);

export const selectCartCategories = createSelector(selectFeature, (state) =>
  state.cart.reduce((prev, curr) => prev.add(curr.category), new Set())
);
