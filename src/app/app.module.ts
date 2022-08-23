import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ShopEffect } from './shop/data-access/store/shop.effect';
import { ProductsComponent } from './shop/feature/products/products.component';
import { ShopComponent } from './shop/feature/shop/shop.component';
import { CardComponent } from './shop/ui/card/card.component';
import { CountInputComponent } from './shop/ui/count-input/count-input.component';
import { DrawerComponent } from './shop/feature/drawer/drawer.component';
import { NavbarComponent } from './shop/ui/navbar/navbar.component';
import { StarsComponent } from './shop/ui/stars/stars.component';
import { rootReducers } from './store';
import { appMinusIcon } from './svg/minus';
import { appPlusIcon } from './svg/plus';
import { FiltersComponent } from './shop/feature/filters/filters.component';
import { NotificationModule } from './shop/utils/notification/notification.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardSmallComponent } from './shop/ui/card-small/card-small.component';
import { appBinIcon } from './svg/bin';

@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    ReactiveFormsModule,
    SvgIconsModule.forRoot({ icons: [appMinusIcon, appPlusIcon, appBinIcon] }),
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot([ShopEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    NotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
