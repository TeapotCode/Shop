import {Component} from '@angular/core';
import {FakeApiService} from "../../data-access/fake-api.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  showDrawer: boolean = true;

  products$ = this.api.getFakeApi()

  constructor(private api: FakeApiService) {}

}
