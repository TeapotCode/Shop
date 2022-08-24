import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { NotifyService } from 'src/app/shop/utils/notification/notify.service';
import * as cartActions from './cart.action';

@Injectable()
export class CartEffect {
  addProductToCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(cartActions.addProductToCart),
        tap(({ product }) => {
          this.toast.notify(
            `Produkt ${product.name} dodano pomyślnie do koszyka`
          );
        })
      );
    },
    { dispatch: false }
  );

  removeProductFromCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(cartActions.removeFromCart),
        tap(({ product }) => {
          this.toast.notify(
            `Produkt ${product.name} pomyślnie usunięty z koszyka`
          );
        })
      );
    },
    { dispatch: false }
  );

  changeProductInCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(cartActions.changeInCart),
        tap(({ product, count }) => {
          this.toast.notify(
            `Pomyślnie ${count > 0 ? 'zwiększono' : 'zmniejszono'} ilość ${
              product.name
            } w koszyku`
          );
        })
      );
    },
    { dispatch: false }
  );

  buyProductsInCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(cartActions.buyProductsInCart),
        tap(() => {
          this.toast.notify('Pomyślnie zakupiono produkty');
          this.router.navigate(['/order-success']);
        })
      );
    },
    { dispatch: false }
  );

  clearCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(cartActions.clearCart),
        tap(() => {
          this.toast.notify('Pomyślnie wyczyszczono koszyk');
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private toast: NotifyService,
    private router: Router
  ) {}
}
