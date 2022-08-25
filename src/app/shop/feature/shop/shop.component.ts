import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ShopFacadeService } from '../../data-access/store/shop-facade.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {
  showDrawer: boolean = false;

  productsInCart$ = this.shop.cartCount$;

  constructor(private shop: ShopFacadeService) {}
  ngOnInit(): void {
    //Magic number
    if (innerWidth > 1044) {
      this.showDrawer = true;
    }
  }
}
