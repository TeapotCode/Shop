import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../data-access/store/shop.action';
import { ShopState } from '../../data-access/store/shop.reducer';
import { selectFilteredProducts } from '../../data-access/store/shop.select';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$ = this.store.select(selectFilteredProducts);

  constructor(private store: Store<ShopState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }
}
