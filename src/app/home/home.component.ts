import { Component, OnInit } from '@angular/core'
import { OwlOptions } from 'ngx-owl-carousel-o'
import { ProductService } from '../service/product.service'
import { Product } from '../models/product';
import { AddToCardService } from '../service/add-to-card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Opened: boolean = true

  // ********PRODUCTS********
  public productsByCategoryName: Product[] = []
  public allProducts: Product[] = []
  public suggestionProducts: Product[] = []
  public suggestionProductsForRecommend: Product[] = []
  public newArrivalProducts: Product[] = []
  public limitedNewArrivalProducts: Product[] = []
  public discountProducts: Product[] = []
  public limitedDiscountProducts: Product[] = []

  // ? Get By ID
  public productId: any = []

  // ************PAGINATION******************
  page: number = 1
  public autoHide: boolean = false
  public responsive: boolean = false

  // *************LOADING**********************
  public isLoadingProducts: boolean = true


  // *************ACTIVE BUTTONS*******************
  tab: any = 'electronic';

  // *************LANG********************
  private culture!: string;

  onClick(check: any) {
    if (check == 1) {
      this.tab = 'electronic';
    } else if (check == 2) {
      this.tab = 'phone';
    } else if (check == 3) {
      this.tab = 'headphone';
    } else if (check == 4) {
      this.tab = 'watch';
    } else if (check == 5) {
      this.tab = 'shoes';
    } else if (check == 6) {
      this.tab = 'sunglasses';
    } else if (check == 7) {
      this.tab = 'makeup';
    } else {
      this.tab = 'plants';
    }
  }

  constructor(private productService: ProductService, private ShoppingCardService: AddToCardService) { }

  ngOnInit() {




    this.isLoadingProducts = true

    // ***********GET ALL PRODUCTS****************
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )

    // ***********GET SUGGESTION PRODUCTS****************
    this.productService.getSuggestProducts().subscribe(
      (data) => {
        this.suggestionProducts = data
      },
      (error) => {
        console.error(error)
      },
    )

    // ***********GET New Arrival PRODUCTS****************
    this.productService.getNewArrivalProducts().subscribe(
      (data) => {
        this.newArrivalProducts = data
      },
      (error) => {
        console.error(error)
      },
    )

    // ***********GET Limited New Arrival PRODUCTS****************
    this.productService.getLimitedNewArrivalProducts().subscribe(
      (data) => {
        this.limitedNewArrivalProducts = data
      },
      (error) => {
        console.error(error)
      },
    )

    // ***********GET Discount PRODUCTS****************
    this.productService.getDiscountsProducts().subscribe(
      (data) => {
        this.discountProducts = data
      },
      (error) => {
        console.error(error)
      },
    )

    // ***********GET Limited discount PRODUCTS****************
    this.productService.getLimitedDiscountProducts().subscribe(
      (data) => {
        this.limitedDiscountProducts = data
      },
      (error) => {
        console.error(error)
      },
    )

    // ***********GET ELECTRONIC PRODUCTS BY DEFAULT****************
    this.productService.getTechnologiesProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
  }

  carouselStore = [
    {
      id: '1',
      src: '../../assets/carousel/girl.jpg',
      alt: 'Pic',
      title: 'Koylaklar',
    },
    {
      id: '2',
      src: '../../assets/carousel/girls.jpg',
      alt: 'two',
      title: 'Mawina',
    },
  ]

  carousel: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  }

  saleProducts: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  }

  bigDiscount: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoHeight: true,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  }

  // ***********************BY CATEGORY NAME***************************
  electronicProducts() {
    // ***********GET ELECTRONIC PRODUCTS****************
    this.productService.getTechnologiesProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
  }

  // ***********GET PHONES PRODUCTS****************
  phoneProducts() {
    this.productService.getPhoneProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
  }

  // ***********GET HEADPHONES PRODUCTS****************
  headphoneProducts() {
    this.productService.getHeadphoneProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
  }

  // ***********GET WATCH PRODUCTS****************
  watchProducts() {
    this.productService.getWatchProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
  }

  // ***********GET SHOES PRODUCTS****************
  shoesProducts() {
    this.productService.getShoesProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
  }

  // ***********GET SUNGLASSES PRODUCTS****************
  sunglassProducts() {
    this.productService.getSunglassesProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
  }

  // ***********GET MAKEUP PRODUCTS****************
  makeupProducts() {
    this.productService.getCosmetologyProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
  }

  // ***********GET PLANTS PRODUCTS****************
  plantProducts() {
    this.productService.getPlantProducts().subscribe(
      (data) => {
        this.productsByCategoryName = data
        this.isLoadingProducts = false
      },
      (error) => {
        console.error(error)
      },
    )
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
    if (!this.ShoppingCardService.productInCard(product)) {

      this.ShoppingCardService.addToCard(product)

    }
  }

}
