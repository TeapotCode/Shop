import {
  cartFeatureKey,
  cartReducer,
} from './shop/data-access/store/cart/cart.reducer';
import {
  databaseFeatureKey,
  databaseReducer,
} from './shop/data-access/store/database/database.reducer';

export const rootReducers = {
  [cartFeatureKey]: cartReducer,
  [databaseFeatureKey]: databaseReducer,
};
