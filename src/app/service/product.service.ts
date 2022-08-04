
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

const BACKEND_URL = 'https://super7shop.herokuapp.com/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public currentCulture = new BehaviorSubject<string>('en');

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Product[]>("https://super7shop.herokuapp.com/api/categories")
  }

  getAllProducts() {
    return this.http.get<Product[]>(BACKEND_URL)
  }

  getViewALl() {
    return this.http.get<Product[]>(BACKEND_URL + '/view-all')
  }

  getSuggestProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/suggest')
  }

  getRecommendProducts(product: Product) {
    return this.http.get<Product[]>(BACKEND_URL + '/recommend/' + product.name)
  }

  getPhoneProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/phones')
  }

  getWatchProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/watches')
  }

  getHeadphoneProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/headphones')
  }

  getCosmetologyProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/cosmetology')
  }

  getPlantProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/plants')
  }

  getShoesProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/shoes')
  }

  getSunglassesProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/sunglasses')
  }

  getTechnologiesProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/technologies')
  }

  getNewArrivalProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/new')
  }

  getLimitedNewArrivalProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/new/limit')
  }

  getDiscountsProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/discounts')
  }

  getLimitedDiscountProducts() {
    return this.http.get<Product[]>(BACKEND_URL + '/discounts/limit')
  }

  newProduct(product: Product) {
    return this.http.post(BACKEND_URL + '/products', product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(
      BACKEND_URL + '/products/' + product._id,
      product
    );
  }

  searchProductByName(key: any) {
    return this.http.get(`${BACKEND_URL}foods/search/${key}`);
  }
  sortByPriceWithSlideRange(min: any, max: any) {
    return this.http.get<Product[]>(BACKEND_URL + `/view-all/sort/${min}/${max}`)
  }

  searchByNameInViewALl(key: any) {
    return this.http.get<Product[]>(BACKEND_URL + `/view-all/search/${key}`)
  }

  getProductById(id: Product) {
    return this.http.get<Product[]>(BACKEND_URL + `/${id._id}`)
  }
}
