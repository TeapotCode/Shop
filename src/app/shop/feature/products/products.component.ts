import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToCart, loadProducts } from '../../data-access/store/shop.action';
import { selectFilteredProducts } from '../../data-access/store/shop.select';
import { Product, ProductChange } from '../../utils/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  products$ = this.store.select(selectFilteredProducts);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  trackBy(index: number, product: Product) {
    return product.id;
  }

  onBuy({ product, count }: ProductChange) {
    this.store.dispatch(addToCart({ product, count }));
  }
}
