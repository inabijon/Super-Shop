import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Options } from '@angular-slider/ngx-slider';
import { Product } from '../../models/product';
import { map } from 'rxjs';
import { LowerCasePipe } from '@angular/common';
import { AddToCardService } from '../../service/add-to-card.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {

  allCategories: any = []
  allProducts: Product[] = []
  newProducts: boolean = false;
  saleProducts: boolean = false;
  selectedCategory: any;
  saleProduct!: boolean

  // ***********SLIDER*******************
  minValue: number = 0;
  maxValue: number = 1500;
  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number): string => {
      return '$' + value;
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      return 'from ' + minValue + ' up to ' + maxValue;
    }
  };

  // ****************Loading Skeleton******************
  isLoadingProducts: boolean = true

  // ************PAGINATION******************
  page: number = 1
  public autoHide: boolean = false
  public responsive: boolean = false

  // ? Get By ID
  public productId: any = []
  public suggestionProductsForRecommend: Product[] = []

  constructor(private productService: ProductService, private shoppingCardService: AddToCardService) { }

  ngOnInit() {
    this.productService.getCategories().subscribe(data => {
      this.allCategories = data
    })

    this.productService.getViewALl().subscribe(data => {
      this.allProducts = data
      this.isLoadingProducts = false
    })
  }

  minValueChanged(event: any) {
    this.isLoadingProducts = true
    this.productService.sortByPriceWithSlideRange(event.value, event.highValue).subscribe(data => {
      this.allProducts = data
      this.isLoadingProducts = false
    })
  }


  newProductChanger(event: any) {
    this.isLoadingProducts = true
    if (event.checked === true) {
      this.productService.getViewALl().subscribe(data => {
        let filter = data.filter(value => value.new)
        this.allProducts = filter
        this.isLoadingProducts = false
      })
    } else {
      this.productService.getViewALl().subscribe(data => {
        this.allProducts = data
        this.isLoadingProducts = false
      })
    }
  }
  saleProductChanger(event: any) {
    this.isLoadingProducts = true
    if (event.checked === true) {
      this.productService.getViewALl().subscribe(data => {
        let filter = data.filter(value => value.sale)
        this.allProducts = filter
        this.isLoadingProducts = false
      })
    } else {
      this.productService.getViewALl().subscribe(data => {
        this.allProducts = data
        this.isLoadingProducts = false
      })
    }
  }

  changeCategory(event: any) {
    this.isLoadingProducts = true
    this.productService.getViewALl().subscribe(data => {
      this.isLoadingProducts = false
      this.allProducts = data.filter(v => this.selectedCategory === v.categoryName)
      if (this.selectedCategory === 'All products') {
        this.isLoadingProducts = true
        this.productService.getViewALl().subscribe(data => {
          this.allProducts = data
          this.isLoadingProducts = false
        })
      }
    })
  }

  searchByNameOrCategoryName(key: any) {
    this.isLoadingProducts = true
    if (key.value.length > 0) {
      this.productService.searchByNameInViewALl(key.value || LowerCasePipe).subscribe(data => {
        this.allProducts = data
        this.isLoadingProducts = false
      })
    } else {
      this.productService.getViewALl().subscribe(data => {
        this.allProducts = data
        this.isLoadingProducts = false
      })
    }
  }
  getById(product: Product) {
    this.productService.getProductById(product).subscribe(data => {
      this.productId = data
    })
    this.productService.getRecommendProducts(product).subscribe(
      (data) => {
        this.suggestionProductsForRecommend = data
      },
      (error) => {
        console.error(error)
      },
    )

  }

  // **************************ADD TO CARD************************************
  addToShoppingCard(product: Product) {
    if (!this.shoppingCardService.productInCard(product)) {
      this.shoppingCardService.addToCard(product)
    }
  }



}
