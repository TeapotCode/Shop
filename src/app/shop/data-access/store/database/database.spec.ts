import * as databaseSelectors from './database.select';
import { DatabaseState } from './database.reducer';
import { ProductMock } from '../../../utils/product.mock';
import { initialState } from '../cart/cart.reducer';
import { ProductCategory } from '../../../utils/product.interface';
import * as cartActions from '../cart/cart.action';
import * as databaseActions from './database.action';
import * as fromReducer from './database.reducer';

describe('DatabaseStore', () => {
  describe('DatabaseSelectors', () => {
    it('should return products from database', () => {
      let initialState: DatabaseState = {
        products: [new ProductMock({}).model(), new ProductMock({}).model()],
        filters: new Set(),
      };

      let products = databaseSelectors.selectProducts.projector(initialState);

      expect(products).toBe(initialState.products);
    });

    it('should return filtered products from database', () => {
      let productWithSnail = new ProductMock({
        category: ProductCategory.SNAILS,
      }).model();
      let initialState: DatabaseState = {
        products: [
          new ProductMock({ category: ProductCategory.BAGUETTES }).model(),
          productWithSnail,
        ],
        filters: new Set([ProductCategory.SNAILS]),
      };

      let product =
        databaseSelectors.selectProductsFiltered.projector(initialState);

      expect(product).toEqual([productWithSnail]);
    });

    it('should NOT filter products if filters are EMPTY from database', () => {
      let productWithSnail = new ProductMock({
        category: ProductCategory.SNAILS,
      }).model();
      let productWithBaguette = new ProductMock({
        category: ProductCategory.BAGUETTES,
      }).model();

      let initialState: DatabaseState = {
        products: [productWithSnail, productWithBaguette],
        filters: new Set([]),
      };

      let product =
        databaseSelectors.selectProductsFiltered.projector(initialState);

      expect(product).toEqual([productWithSnail, productWithBaguette]);
    });

    it('should return filters from database', () => {
      let initialState: DatabaseState = {
        products: [],
        filters: new Set([ProductCategory.SNAILS, ProductCategory.BAGUETTES]),
      };

      let product = databaseSelectors.selectFilters.projector(initialState);

      expect(product).toEqual(
        new Set([ProductCategory.SNAILS, ProductCategory.BAGUETTES])
      );
    });
  });

  describe('DatabaseReducer', () => {
    describe('filter', () => {
      it('should add to filter if empty', () => {
        const initialState: DatabaseState = {
          products: [],
          filters: new Set(),
        };
        const newState: DatabaseState = {
          products: [],
          filters: new Set([ProductCategory.BAGUETTES]),
        };

        const action = databaseActions.toggleFilter({
          filter: ProductCategory.BAGUETTES,
        });
        const state = fromReducer.databaseReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
      });

      it('should add to filter', () => {
        const initialState: DatabaseState = {
          products: [],
          filters: new Set([ProductCategory.BAGUETTES]),
        };
        const newState: DatabaseState = {
          products: [],
          filters: new Set([ProductCategory.BAGUETTES, ProductCategory.FROGS]),
        };

        const action = databaseActions.toggleFilter({
          filter: ProductCategory.FROGS,
        });
        const state = fromReducer.databaseReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
      });

      it('should remove from filter if already toggled', () => {
        const initialState: DatabaseState = {
          products: [],
          filters: new Set([ProductCategory.BAGUETTES]),
        };
        const newState: DatabaseState = {
          products: [],
          filters: new Set([]),
        };

        const action = databaseActions.toggleFilter({
          filter: ProductCategory.BAGUETTES,
        });
        const state = fromReducer.databaseReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
      });
    });

    describe('product related action', () => {
      it('should add inStock to product on removing from cart', () => {
        const product = new ProductMock({ inStock: 10 }).model();

        const placeholderProduct = new ProductMock({ id: 99 }).model();

        const initialState = {
          products: [placeholderProduct, product],
          filters: new Set([]),
        };
        const newState = {
          products: [
            placeholderProduct,
            new ProductMock({ inStock: 12 }).model(),
          ],
          filters: new Set([]),
        };

        const action = cartActions.removeFromCart({ product, count: 2 });
        const state = fromReducer.databaseReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
      });

      it('should remove inStock from product on adding to cart', () => {
        const product = new ProductMock({ inStock: 10 }).model();
        const placeholderProduct = new ProductMock({ id: 99 }).model();

        const initialState = {
          products: [placeholderProduct, product],
          filters: new Set([]),
        };
        const newState = {
          products: [
            placeholderProduct,
            new ProductMock({ inStock: 8 }).model(),
          ],
          filters: new Set([]),
        };

        const action = cartActions.addProductToCart({ product, count: 2 });
        const state = fromReducer.databaseReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
      });

      it('should change inStock on change in cart', () => {
        const product = new ProductMock({ inStock: 10 }).model();

        const placeholderProduct = new ProductMock({ id: 99 }).model();

        const initialState = {
          products: [placeholderProduct, product],
          filters: new Set([]),
        };
        const newState = {
          products: [
            placeholderProduct,
            new ProductMock({ inStock: 9 }).model(),
          ],
          filters: new Set([]),
        };

        const action = cartActions.changeInCart({ product, count: 1 });
        const state = fromReducer.databaseReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
      });

      it('should reset inStock on clear cart', () => {
        const product = new ProductMock({ inStock: 5, max: 10 }).model();
        const initialState = {
          products: [product],
          filters: new Set([]),
        };
        const newState = {
          products: [new ProductMock({ inStock: 10, max: 10 }).model()],
          filters: new Set([]),
        };

        const action = cartActions.clearCart();
        const state = fromReducer.databaseReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
      });

      it('should set max on buy products in cart', () => {
        const product = new ProductMock({ inStock: 5, max: 10 }).model();
        const initialState = {
          products: [product],
          filters: new Set([]),
        };
        const newState = {
          products: [new ProductMock({ inStock: 5, max: 5 }).model()],
          filters: new Set([]),
        };

        const action = cartActions.buyProductsInCart();
        const state = fromReducer.databaseReducer(initialState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(initialState);
      });
    });
  });
});
