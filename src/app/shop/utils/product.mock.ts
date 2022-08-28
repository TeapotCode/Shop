import { Product, ProductCategory } from './product.interface';
export class ProductMock {
  private _data: Product = {
    id: 10,
    max: 20,
    name: 'snail',
    stars: 5,
    inStock: 20,
    imgName: '',
    price: 20,
    category: ProductCategory.SNAILS,
  };

  constructor(data?: Partial<Product>) {
    this._data = {
      ...this._data,
      ...data,
    };
  }

  model(): Product {
    return this._data;
  }
}
