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

export interface ProductOut {
  productId: number;
  count: number;
}
