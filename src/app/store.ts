import {
  shopReducer,
  shopReducerKey,
} from './shop/data-access/store/shop.reducer';

export const rootReducers = {
  [shopReducerKey]: shopReducer,
};
