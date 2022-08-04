import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';


const BACKEND_URL = 'https://super7shop.herokuapp.com/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: any;
  private tokenTimer: any;
  private isAuthenticated = false;
  private isUserAdmin = false
  private authStatusListener = new Subject<boolean>();
  private isAdminStatusListener = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private acRoute: ActivatedRoute
  ) { }

  getIsAdminStatusListener() {
    return this.isAdminStatusListener.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getIsAdmin() {
    return this.isUserAdmin
  }

  Signup(user: any) {
    return this.http.post<{ result: any, message: string }>(BACKEND_URL + '/user', user)
  }

  // Sign-in
  signIn(user: any) {
    return this.http
      .post<{ token: string, expiresIn: any }>(BACKEND_URL + '/auth', user)
      .subscribe(
        (res) => {
          if (res.token) {
            let returnUrl = this.acRoute.snapshot.queryParamMap.get('returnUrl')
            const token = res.token;
            const expiresInDuration = res.expiresIn;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            this.setAuthTimer(expiresInDuration);
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate);
            this.router.navigate([returnUrl || '/']);
            if (this.getCurrentUser.isAdmin === true) {
              this.isUserAdmin = true
              this.isAdminStatusListener.next(true);
            } else {
              this.isUserAdmin = false
              this.isAdminStatusListener.next(false);
            }
            this.toastr.success('Successfully login', 'post', {
              closeButton: false,
              progressAnimation: 'increasing',
              progressBar: true,
              easing: 'linear',
            });
          }
        },
        () => {
          this.isAdminStatusListener.next(false)
          this.authStatusListener.next(false);
          this.toastr.error('Email or password error', 'post', {
            closeButton: false,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
          });
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private getAuthData(): { token: string; expirationDate: Date; } | undefined {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  logout() {
    this.router.navigate(['/']);
    this.isAuthenticated = false;
    this.isUserAdmin = false
    this.authStatusListener.next(false);
    this.isAdminStatusListener.next(false);
    this.clearAuthData();
    localStorage.removeItem('isAuth');
  }

  get getCurrentUser() {
    let token = localStorage.getItem('token');

    if (!token) {
      return false;
    } else {
      let helper = new JwtHelperService().decodeToken(token);
      return helper;
    }
  }

}
