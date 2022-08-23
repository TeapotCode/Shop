export enum ProductCategory {
  SNAILS = 'SNAILS',
  BAGUETTES = 'BAGUETTES',
  FROGS = 'FROGS',
}

export interface ProductIn {
  id: number;
  name: string;
  stars: number;
  inStock: number;
  imgName: string;
  price: number;
  category: ProductCategory;
}

export interface Product extends ProductIn {
  max: number;
}

export interface ProductChange {
  product: Product;
  count: number;
}
