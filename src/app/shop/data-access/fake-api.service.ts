import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ProductCategory, ProductIn } from '../utils/product.interface';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  readonly stockInitialState: ProductIn[] = [
    {
      id: 1,
      name: 'Ślimaki w serze',
      stars: 4,
      inStock: 25,
      imgName: 'snails-in-cheese.jpg',
      price: 17,
      category: ProductCategory.SNAILS,
    },
    {
      id: 2,
      name: 'Ślimaki w maśle',
      stars: 4,
      inStock: 13,
      imgName: 'snails-in-cheese.jpg',
      price: 12,
      category: ProductCategory.SNAILS,
    },
    {
      id: 3,
      name: 'Ślimaki w śmietanie',
      stars: 3,
      inStock: 0,
      imgName: 'snails-in-cheese.jpg',
      price: 20,
      category: ProductCategory.SNAILS,
    },
    {
      id: 4,
      name: 'Ślimaki wg przepisu cioci',
      stars: 2,
      inStock: 10,
      imgName: 'snails-in-cheese.jpg',
      price: 12,
      category: ProductCategory.SNAILS,
    },
    {
      id: 5,
      name: 'Ślimaki zwykłe',
      stars: 5,
      inStock: 30,
      imgName: 'snails-in-cheese.jpg',
      price: 10,
      category: ProductCategory.SNAILS,
    },
    {
      id: 6,
      name: 'Żaba zwykła',
      stars: 4,
      inStock: 2,
      imgName: 'snails-in-cheese.jpg',
      price: 30,
      category: ProductCategory.FROGS,
    },
  ];

  getFakeApi() {
    return of(this.stockInitialState);
  }
}
