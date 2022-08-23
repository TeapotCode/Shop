import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product, ProductChange } from '../../utils/product.interface';

@Component({
  selector: 'app-card-small',
  templateUrl: './card-small.component.html',
  styleUrls: ['./card-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSmallComponent implements OnInit {
  count = new FormControl(0, { nonNullable: true });

  @Input() product!: Product;
  @Output() onRemove = new EventEmitter<ProductChange>();
  @Output() onAdd = new EventEmitter<void>();
  @Input() maxStock!: number;

  removeProduct() {
    this.onRemove.emit({
      product: this.product,
      count: this.count.value,
    });
  }

  ngOnInit(): void {
    this.count.setValue(this.product.inStock);
  }

  add() {
    this.onAdd.emit();
  }
  removeOne() {
    this.onRemove.emit({
      product: this.product,
      count: 1,
    });
  }
}
