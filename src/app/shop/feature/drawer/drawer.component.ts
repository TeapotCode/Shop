import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToCart,
  removeFromCart,
  resetCart,
} from '../../data-access/store/shop.action';
import {
  selectCartCostSum,
  selectCartCount,
  selectCategoriesInCart,
  selectProductsInCart,
} from '../../data-access/store/shop.select';
import { Product, ProductChange } from '../../utils/product.interface';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  numberOfProducts$ = this.store.select(selectCartCount);
  costOfProducts$ = this.store.select(selectCartCostSum);
  productsInCart$ = this.store.select(selectProductsInCart);

  categoriesInCart$ = this.store.select(selectCategoriesInCart);

  constructor(private store: Store) {}

  remove(productOut: ProductChange) {
    this.store.dispatch(removeFromCart(productOut));
  }

  addProduct(product: Product) {
    this.store.dispatch(addToCart({ product, count: 1 }));
  }

  clearCart() {
    this.store.dispatch(resetCart());
  }
}
