import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShopFacadeService } from '../../data-access/store/shop-facade.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  numberOfProducts$ = this.shop.cartCount$;
  costOfProducts$ = this.shop.cartCost$;
  productsInCart$ = this.shop.cart$;

  categoriesInCart$ = this.shop.categoriesInCart$;

  constructor(private shop: ShopFacadeService) {}

  clearCart() {
    this.shop.clearCart();
  }

  buy() {
    this.shop.buyCart();
  }
}
