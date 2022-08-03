export interface Product {
  _id: string;
  name: string;
  imgUrl: string;
  description: string;
  categoryName: string;
  price: number;
  new: boolean;
  sale: boolean;
  salePrice: number;
  discountPercent: number;
  qtyTotal: number;
  total: number;
}
