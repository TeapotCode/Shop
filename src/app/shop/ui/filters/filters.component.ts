import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShopFacadeService } from '../../data-access/store/shop-facade.service';
import { ProductCategory } from '../../utils/product.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  productCategory = ProductCategory;

  selectedFilters$ = this.shop.filters$;

  constructor(private shop: ShopFacadeService) {}

  onSelect(key: keyof typeof ProductCategory) {
    this.shop.toggleFilter(this.productCategory[key]);
  }
}
