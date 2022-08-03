import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './helper/not-found/not-found.component';
import { ContactComponent } from './helper/contact/contact.component';
import { CheckOutComponent } from './helper/check-out/check-out.component';
import { ViewAllComponent } from './helper/view-all/view-all.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'view-all', component: ViewAllComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth/auth-routing.module').then((m) => m.AuthRoutingModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
