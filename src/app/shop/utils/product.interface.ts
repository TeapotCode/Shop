export enum ProductCategory {
  SNAILS,
  BAGUETTES,
  FROGS
}

export interface Product {
  id: number
  name: string
  stars: number
  inStock: number
  imgName: string
  price: number
  category: ProductCategory
}
