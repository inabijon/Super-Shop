import { Component, HostBinding, HostListener, OnInit } from '@angular/core'
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router'
import { Product } from '../models/product'
import { AddToCardService } from '../service/add-to-card.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  // Mobile sidebar
  public sidebarShow: boolean = false
  public sidebarShowCARD: boolean = false

  searchBoxMobile: boolean = false

  productId: any = []
  allProducts: Product[] = []
  public suggestionProductsForRecommend: Product[] = []

  // ***************SEARCH**********************
  mobileSearchedProducts: Product[] = []
  searchDataMobile: any

  // Loading
  loadingRecommend: boolean = true
  loadingDialog: boolean = true

  constructor(
    private productService: ProductService,
    private router: Router,
    public shoppingCardService: AddToCardService,
    public translate: TranslateService,
    private auth: AuthService
  ) {
    translate.addLangs(['en', 'uz']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  // !AUTH
  isUserAuthListener!: Subscription;
  private authListenerSubs!: Subscription;
  userIsAuthenticated = false;
  isAdmin = false;
  logout() {
    this.auth.logout();
  }



  // **_____________MAIN NAVBAR click anchor and close side Nav__________________**
  sideMainNavbar() {
    this.sidebarShow = false
  }

  // !________________SHOPPING CARD_________________
  shopping_Bag: Product[] = []

  deleteProductFromShoppingCard(product: Product) {
    this.shoppingCardService.removeProductFromShoppingCard(product)
  }

  totalPriceShoppingCard() { }

  ngOnInit() {
    this.shopping_Bag = this.shoppingCardService.getProductFromLocalStorage()

    // !Authentication
    this.userIsAuthenticated = this.auth.getIsAuth();
    const token = localStorage.getItem('token')
    if (token) {
      this.userIsAuthenticated = true
      if (this.auth.getCurrentUser.isAdmin === true) {
        this.isAdmin = true
        this.userIsAuthenticated = true
      }
    }

    this.authListenerSubs = this.auth
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.auth
      .getIsAdminStatusListener()
      .subscribe((data) => (this.isAdmin = data));

  }

  // !______________CHECK OUT_________________________
  checkOut() {
    this.router.navigate(['/check-out'])
  }

  mobileSearchBox() {
    this.searchBoxMobile = !this.searchBoxMobile
  }
  searchProduct: any

  getById(product: Product) {
    this.searchProduct = '';
    this.searchBoxMobile = false
    this.searchDataMobile = '';
    this.loadingDialog = true
    this.loadingRecommend = true
    this.productService.getProductById(product).subscribe((data) => {
      this.productId = data
      this.loadingDialog = false
    })

    this.productService.getRecommendProducts(product).subscribe(
      (data) => {
        this.suggestionProductsForRecommend = data
        this.loadingRecommend = false
      },
      (error) => {
        console.error(error)
        setTimeout(() => {
          this.loadingDialog = false
          this.loadingRecommend = false
        }, 3000);
      },
    )
  }

  searchByNameOrCategoryName(key: any) {
    if (key.value.length > 0) {
      this.productService.searchByNameInViewALl(key.value).subscribe((data) => {
        this.allProducts = data
      })
    } else {
      this.productService.getViewALl().subscribe((data) => {
        this.allProducts = data
      })
    }
  }

  searchByNameOrCategoryNameViaMobileVersion(key: any) {
    if (key.value.length > 0) {
      this.productService.searchByNameInViewALl(key.value).subscribe((data) => {
        this.mobileSearchedProducts = data
      })
    } else {
      this.productService.getViewALl().subscribe((data) => {
        this.mobileSearchedProducts = data
      })
    }
  }

  // **************************ADD TO CARD************************************
  addToShoppingCard(product: Product) {
    if (!this.shoppingCardService.productInCard(product)) {
      this.shoppingCardService.addToCard(product)
      console.log(this.shoppingCardService.getAddedProducts())
    }
  }
}
