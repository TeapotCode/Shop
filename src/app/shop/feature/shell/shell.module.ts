import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CartEffect } from '../../data-access/store/cart/cart.effect';
import {
  cartFeatureKey,
  cartReducer,
} from '../../data-access/store/cart/cart.reducer';
import { DatabaseEffect } from '../../data-access/store/database/database.effect';
import {
  databaseFeatureKey,
  databaseReducer,
} from '../../data-access/store/database/database.reducer';
import { CardSmallComponent } from '../../ui/card-small/card-small.component';
import { CardComponent } from '../../ui/card/card.component';
import { CountInputComponent } from '../../ui/count-input/count-input.component';
import { NavbarComponent } from '../../ui/navbar/navbar.component';
import { StarsComponent } from '../../ui/stars/stars.component';
import { NotificationModule } from '../../utils/notification/notification.module';
import { DrawerComponent } from '../drawer/drawer.component';
import { FiltersComponent } from '../filters/filters.component';
import { ProductsComponent } from '../products/products.component';
import { ShopComponent } from '../shop/shop.component';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  declarations: [
    ShopComponent,
    NavbarComponent,
    CardComponent,
    DrawerComponent,
    StarsComponent,
    CountInputComponent,
    ProductsComponent,
    FiltersComponent,
    CardSmallComponent,
  ],
  imports: [
    CommonModule,
    NotificationModule,
    ReactiveFormsModule,
    ShellRoutingModule,
    SvgIconsModule,
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    StoreModule.forFeature(databaseFeatureKey, databaseReducer),
    EffectsModule.forFeature([DatabaseEffect, CartEffect]),
  ],
})
export class ShellModule {}
