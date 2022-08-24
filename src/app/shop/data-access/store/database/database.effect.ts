import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { FakeApiService } from '../../fake-api.service';
import * as actions from './database.action';

@Injectable()
export class DatabaseEffect {
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadDatabase),
      switchMap(() => this.api.getFakeApi()),
      map((response) =>
        actions.setDatabase({
          products: response.map((product) => ({
            ...product,
            max: product.inStock,
          })),
        })
      )
    );
  });

  constructor(private actions$: Actions, private api: FakeApiService) {}
}
