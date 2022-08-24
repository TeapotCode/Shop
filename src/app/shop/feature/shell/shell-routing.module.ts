import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'order-success', component: OrderCompleteComponent },
];

import { NgModule } from '@angular/core';
import { ShopComponent } from '../shop/shop.component';
import { OrderCompleteComponent } from '../order-complete/order-complete.component';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
