import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product, ProductChange } from '../../utils/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  count = new FormControl(1, { nonNullable: true });

  product: Product | undefined;

  @Input('product')
  set _product(productIn: Product) {
    this.product = productIn;
    if (productIn.inStock === 1) this.count.setValue(1);
  }
  @Output() onBuy = new EventEmitter<ProductChange>();

  AddToCartClick() {
    if (this.count.value <= 0) return;
    this.onBuy.emit({ product: this.product!, count: this.count.value });
  }
}
