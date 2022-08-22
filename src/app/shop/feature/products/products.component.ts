import { Component, OnInit } from '@angular/core';
import {FakeApiService} from "../../data-access/fake-api.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  showDrawer: boolean = true;

  products$ = this.api.getFakeApi()

  constructor(private api: FakeApiService) {}

}
