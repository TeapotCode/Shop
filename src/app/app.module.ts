import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/feature/shop/shop.component';
import { NavbarComponent } from './shop/ui/navbar/navbar.component';
import { CardComponent } from './shop/ui/card/card.component';
import { DrawerComponent } from './shop/ui/drawer/drawer.component';
import { StarsComponent } from './shop/ui/stars/stars.component';
import {SvgIconsModule} from "@ngneat/svg-icon";
import {appMinusIcon} from "./svg/minus";
import {appPlusIcon} from "./svg/plus";
import { CountInputComponent } from './shop/ui/count-input/count-input.component';
import { ProductsComponent } from './shop/feature/products/products.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, SvgIconsModule.forRoot({icons: [appMinusIcon, appPlusIcon]})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
