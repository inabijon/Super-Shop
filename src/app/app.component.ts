import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  LoadingRouter: boolean = false
  constructor(private renderer: Renderer2, private _router: Router) {

    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.LoadingRouter = true
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.LoadingRouter = false
      }, 1200);
    }
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.LoadingRouter = false
      }, 1200);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.LoadingRouter = false
      }, 1200);
    }
  }

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
