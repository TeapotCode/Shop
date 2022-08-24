import { createFeatureSelector, createSelector } from '@ngrx/store';
import { databaseFeatureKey, DatabaseState } from './database.reducer';

export const selectFeature =
  createFeatureSelector<DatabaseState>(databaseFeatureKey);

export const selectDatabase = createSelector(
  selectFeature,
  (state) => state.products
);

export const selectFilters = createSelector(
  selectFeature,
  (state) => state.filters
);

export const selectDatabaseFiltered = createSelector(selectFeature, (state) =>
  state.filters.length
    ? state.products.filter((product) =>
        state.filters.includes(product.category)
      )
    : state.products
);
