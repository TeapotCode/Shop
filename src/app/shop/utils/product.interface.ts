export enum ProductCategory {
  SNAILS = 'SNAILS',
  BAGUETTES = 'BAGUETTES',
  FROGS = 'FROGS',
}

export interface Product {
  id: number;
  name: string;
  stars: number;
  inStock: number;
  imgName: string;
  price: number;
  category: ProductCategory;
}

export interface ProductChange {
  product: Product;
  count: number;
}

export interface ProductInCart extends Product {
  max: number;
}
