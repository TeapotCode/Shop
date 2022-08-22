import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { FakeApiService } from '../fake-api.service';
import * as actions from './shop.action';

@Injectable()
export class ShopEffect {
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadProducts),
      switchMap(() => this.api.getFakeApi()),
      map((response) => actions.setProducts({ products: response }))
    );
  });

  constructor(private actions$: Actions, private api: FakeApiService) {}
}
