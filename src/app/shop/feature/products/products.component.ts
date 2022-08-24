import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShopFacadeService } from '../../data-access/store/shop-facade.service';
import { Product, ProductChange } from '../../utils/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  products$ = this.shop.databaseFiltered$;

  constructor(private shop: ShopFacadeService) {}

  trackBy(index: number, product: Product) {
    return product.id;
  }

  onBuy({ product, count }: ProductChange) {
    this.shop.addToCart({ product, count });
  }
}
