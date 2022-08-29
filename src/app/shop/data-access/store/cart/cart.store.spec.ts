import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMock } from '@testing-library/angular/jest-utils';
import { Observable, of } from 'rxjs';
import { NotifyService } from '../../../utils/notification/notify.service';
import {
  ProductCategory,
  ProductChange,
} from '../../../utils/product.interface';
import { ShopFacadeService } from '../shop-facade.service';
import * as cartActions from './cart.action';
import { CartEffects } from './cart.effect';
import { CartState, initialState } from './cart.reducer';
import * as cartSelector from './cart.select';
import * as fromReducer from './cart.reducer';
import { Product } from '../../../utils/product.interface';
import { ProductMock } from '../../../utils/product.mock';

describe('CartStore', () => {
  describe('CartEffects', () => {
    let PRODUCT_CHANGE_EXAMPLE: ProductChange;

    let effects: CartEffects;
    let store: MockStore;
    let action$: Observable<any>;
    let toast: NotifyService;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CartEffects,
          provideMockStore({}),
          provideMock(NotifyService),
          provideMock(ShopFacadeService),
          provideMockActions(() => action$),
          provideMock(Router),
        ],
      });

      effects = TestBed.inject(CartEffects);
      store = TestBed.inject(MockStore);
      toast = TestBed.inject(NotifyService);
      router = TestBed.inject(Router);
    });

    beforeEach(() => {
      PRODUCT_CHANGE_EXAMPLE = {
        product: new ProductMock({}).model(),
        count: 2,
      };
    });

    test(`adding product should trigger toast`, (done) => {
      action$ = of(cartActions.addProductToCart(PRODUCT_CHANGE_EXAMPLE));

      const toastSpy = jest.spyOn(toast, 'notify');

      effects.addProductToCart$.subscribe(() => {
        expect(toastSpy).toHaveBeenCalled();
        done();
      });
    });

    test(`buying product should trigger toast and redirect`, (done) => {
      action$ = of(cartActions.buyProductsInCart());

      const toastSpy = jest.spyOn(toast, 'notify');
      const routerSpy = jest.spyOn(router, 'navigate');

      effects.buyProductsInCart$.subscribe(() => {
        expect(toastSpy).toHaveBeenCalled();
        expect(routerSpy).toBeCalledWith(['/order-success']);
        done();
      });
    });

    test(`change in cart should trigger toast`, (done) => {
      action$ = of(cartActions.changeInCart(PRODUCT_CHANGE_EXAMPLE));

      const toastSpy = jest.spyOn(toast, 'notify');

      effects.changeProductInCart$.subscribe(() => {
        expect(toastSpy).toHaveBeenCalled();
        done();
      });
    });

    test(`clearing cart should trigger toast`, (done) => {
      action$ = of(cartActions.clearCart());

      const toastSpy = jest.spyOn(toast, 'notify');

      effects.clearCart$.subscribe(() => {
        expect(toastSpy).toHaveBeenCalled();
        done();
      });
    });

    test(`removing from cart should trigger toast`, (done) => {
      action$ = of(cartActions.removeFromCart(PRODUCT_CHANGE_EXAMPLE));

      const toastSpy = jest.spyOn(toast, 'notify');

      effects.removeProductFromCart$.subscribe(() => {
        expect(toastSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('CartSelectors', () => {
    const initialState: CartState = {
      cart: [
        new ProductMock({ inStock: 2 }).model(),
        new ProductMock({
          category: ProductCategory.BAGUETTES,
          inStock: 3,
        }).model(),
      ],
    };

    it('should select all products in cart', () => {
      const cartSelectResult =
        cartSelector.selectCartProducts.projector(initialState);

      expect(cartSelectResult).toBe(initialState.cart);
    });

    it('should select categories of products in cart', () => {
      const cartSelectResult =
        cartSelector.selectCartCategories.projector(initialState);

      expect(cartSelectResult).toEqual(
        new Set([ProductCategory.BAGUETTES, ProductCategory.SNAILS])
      );
    });

    it('should select cost of products in cart', () => {
      const cartSelectResult =
        cartSelector.selectCartCostSum.projector(initialState);

      expect(cartSelectResult).toEqual(
        initialState.cart.reduce(
          (prev, curr) => prev + curr.inStock * curr.price,
          0
        )
      );
    });

    it('should select count of products in cart', () => {
      const cartSelectResult =
        cartSelector.selectCartCount.projector(initialState);

      expect(cartSelectResult).toBe(5);
    });
  });

  describe('CartReducer', () => {
    let EXAMPLE_PRODUCT: Product;

    beforeEach(() => {
      EXAMPLE_PRODUCT = new ProductMock({}).model();
    });

    it('should add product to cart', () => {
      const placeholderProduct = new ProductMock({ id: 99 }).model();
      const initialState: CartState = { cart: [placeholderProduct] };
      const newState: CartState = {
        cart: [placeholderProduct, EXAMPLE_PRODUCT],
      };
      const action = cartActions.addProductToCart({
        product: EXAMPLE_PRODUCT,
        count: EXAMPLE_PRODUCT.inStock,
      });
      const state = fromReducer.cartReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });

    it('should remove product from cart', () => {
      const initialState = { cart: [EXAMPLE_PRODUCT] };
      const newState: CartState = { cart: [] };
      const action = cartActions.removeFromCart({
        product: EXAMPLE_PRODUCT,
        count: EXAMPLE_PRODUCT.inStock,
      });
      const state = fromReducer.cartReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });

    it('should clear cart on buy', () => {
      const initialState = { cart: [EXAMPLE_PRODUCT] };
      const newState: CartState = { cart: [] };
      const action = cartActions.buyProductsInCart();
      const state = fromReducer.cartReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });

    it('should change stock of product in cart', () => {
      const placeholderProduct = new ProductMock({ id: 99 }).model();
      const initialState = { cart: [placeholderProduct, EXAMPLE_PRODUCT] };
      const newState: CartState = {
        cart: [
          placeholderProduct,
          { ...EXAMPLE_PRODUCT, inStock: EXAMPLE_PRODUCT.inStock + 1 },
        ],
      };
      const action = cartActions.changeInCart({
        product: EXAMPLE_PRODUCT,
        count: 1,
      });
      const state = fromReducer.cartReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });

    it('should clear cart on clear', () => {
      const initialState = { cart: [EXAMPLE_PRODUCT] };
      const newState: CartState = { cart: [] };
      const action = cartActions.clearCart();
      const state = fromReducer.cartReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });

    it('should add stock if product already in cart', () => {
      const placeholderProduct = new ProductMock({ id: 99 }).model();
      const initialState = { cart: [placeholderProduct, EXAMPLE_PRODUCT] };
      const newState: CartState = {
        cart: [
          placeholderProduct,
          { ...EXAMPLE_PRODUCT, inStock: EXAMPLE_PRODUCT.inStock + 3 },
        ],
      };
      const action = cartActions.addProductToCart({
        product: EXAMPLE_PRODUCT,
        count: 3,
      });
      const state = fromReducer.cartReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});
