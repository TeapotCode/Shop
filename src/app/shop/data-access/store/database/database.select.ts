import { createFeatureSelector, createSelector } from '@ngrx/store';
import { databaseFeatureKey, DatabaseState } from './database.reducer';

export const selectFeature =
  createFeatureSelector<DatabaseState>(databaseFeatureKey);

export const selectProducts = createSelector(
  selectFeature,
  (state) => state.products
);

export const selectFilters = createSelector(
  selectFeature,
  (state) => state.filters
);

export const selectProductsFiltered = createSelector(selectFeature, (state) =>
  state.filters.size
    ? state.products.filter((product) => state.filters.has(product.category))
    : state.products
);
