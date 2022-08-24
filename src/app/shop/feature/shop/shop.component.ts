import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShopFacadeService } from '../../data-access/store/shop-facade.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  showDrawer: boolean = true;

  productsInCart$ = this.shop.cartCount$;

  constructor(private shop: ShopFacadeService) {}
}
