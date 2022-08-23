import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '../../utils/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  count = new FormControl(0, { nonNullable: true });

  @Input() product: Product | undefined;
  @Output() onBuy = new EventEmitter<{ productId: number; count: number }>();

  onAddToCartClick() {
    if (this.count.value === 0) return;
    this.onBuy.emit({ productId: this.product!.id, count: this.count.value });
  }
}
