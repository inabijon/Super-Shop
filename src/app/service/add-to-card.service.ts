import { ElementRef, Injectable, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AddToCardService {
  currencyPipe: any;

  constructor() { }

  private shoppingCard: Product[] = [];
  private _shoppingCardListener = new BehaviorSubject<Product[]>(this.shoppingCard)


  getShoppingCardListener() {
    return this._shoppingCardListener.asObservable()
  }

  addToCard(product: any) {
    product.qtyTotal = 1;
    this.shoppingCard.push(product)
    this._shoppingCardListener.next(product)
    this.saveCardToLocalStorage()
  }

  getAddedProducts() {
    return [...this.shoppingCard]
  }


  get getPrice() {
    let filter = this.shoppingCard.map(p => p.price)
    let total = 0
    for (let i in filter) {
      total += filter[i]
    }
    return total
  }

  get salePrice() {
    let filter = this.shoppingCard.filter(v => v.sale).map(p => p.salePrice)
    let total = 0
    for (let i in filter) {
      total += filter[i]
    }
    return total

  }

  get resultSaleAndPrice(): any {
    return this.getPrice - this.salePrice // price - salePrice
  }

  get TOTAL() {
    let sale = this.shoppingCard.filter(v => v.sale).map(p => p.salePrice)
    let saleTotal = 0
    for (let i in sale) {
      saleTotal += sale[i]
    }

    let filter = this.shoppingCard.map(p => p.price)
    let total = 0
    for (let i in filter) {
      total += filter[i]
    }
    return total - saleTotal
  }

  saveCardToLocalStorage() {
    localStorage.setItem('card', JSON.stringify(this.shoppingCard))
  }

  getProductFromLocalStorage() {
    return (this.shoppingCard = JSON.parse(localStorage.getItem('card')!) ?? [])
  }

  clearShoppingCard() {
    this.shoppingCard = []
    localStorage.removeItem('card')
  }

  removeProductFromShoppingCard(product: Product) {
    const index = this.shoppingCard.findIndex((p) => p._id === product._id);

    if (index > -1) {
      this.shoppingCard.splice(index, 1)
      this.saveCardToLocalStorage()
      this._shoppingCardListener.next(this.shoppingCard)
    }
  }

  productInCard(product: Product): boolean {
    return this.shoppingCard.findIndex((p) => p._id === product._id) > -1
  }

}
