import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService,
  ) { }

  isLoading = false
  ngOnInit() { }

  registerUser(user: NgForm) {
    this.isLoading = true
    if (!user.valid) {
      return
    }
    this.authService.Signup(user.value).subscribe(
      (data) => {
        if (data.result) {
          this.isLoading = false
          this.toastr.success(`${data.message}`, 'post', {
            closeButton: false,
            progressAnimation: 'increasing',
            progressBar: true,
            easing: 'linear',
            positionClass: 'toast-top-left',
          })
          this.router.navigate(['/auth/login'])
        }
      },
      () => {
        setTimeout(() => {
          this.isLoading = false
        }, 1500)
        this.toastr.error(`User exist`, 'post', {
          closeButton: false,
          progressAnimation: 'increasing',
          progressBar: true,
          easing: 'linear',
        })
      },
    )
    user.resetForm()
  }
}
