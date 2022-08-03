import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService) { }

  isLoading = false;
  private authStatusSub!: Subscription;

  ngOnInit() {
    this.authStatusSub = this.auth.getAuthStatusListener().subscribe((auth) => {
      this.isLoading = false;
    });
  }

  loginUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.auth.signIn(form.value);
    form.resetForm();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
