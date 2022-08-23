import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShopState } from '../../data-access/store/shop.reducer';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent {
  constructor(private store: Store<ShopState>) {}
}
