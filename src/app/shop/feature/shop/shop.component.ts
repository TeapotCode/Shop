import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShopState } from '../../data-access/store/shop.reducer';
import { selectCartCount } from '../../data-access/store/shop.select';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  showDrawer: boolean = true;

  productsInCart$ = this.store.select(selectCartCount);

  constructor(private store: Store<ShopState>) {}
}
