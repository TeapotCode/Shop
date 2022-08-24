import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShopFacadeService } from '../../data-access/store/shop-facade.service';
import { Product } from '../../utils/product.interface';

@Component({
  selector: 'app-card-small',
  templateUrl: './card-small.component.html',
  styleUrls: ['./card-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSmallComponent implements OnInit {
  count = new FormControl(0, { nonNullable: true });

  @Input() product!: Product;
  @Input() maxStock!: number;

  constructor(private shop: ShopFacadeService) {}

  removeProduct() {
    this.shop.removeFromCart({
      product: this.product,
      count: this.product.inStock,
    });
  }

  ngOnInit(): void {
    this.count.setValue(this.product.inStock);
  }

  add() {
    this.shop.addToCart({ product: this.product, count: 1 });
  }
  removeOne() {
    this.shop.removeFromCart({ product: this.product, count: 1 });
  }
}
