import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleFilter } from '../../data-access/store/shop.action';
import { ShopState } from '../../data-access/store/shop.reducer';
import { selectFilters } from '../../data-access/store/shop.select';
import { ProductCategory } from '../../utils/product.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  productCategory = ProductCategory;

  selectedFilters$ = this.store.select(selectFilters);

  constructor(private store: Store) {}

  onSelect(key: keyof typeof ProductCategory) {
    this.store.dispatch(toggleFilter({ filter: ProductCategory[key] }));
  }
}
