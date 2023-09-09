import { Component} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';

import { PlaceholderComponent } from './placeholder/placeholder.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [PlaceholderComponent, LoginComponent, SignUpComponent, CarouselModule, CommonModule],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.scss'],
})
export class AuthComponent {
  testimonialList: number[] = new Array(4);
  isLogin = false;
  isLoading = false;


  onToggelMode() {
    const newPromise = new Promise((resolve, reject) => {
      this.isLoading = true;
      console.log(this.isLogin);
      setTimeout(() => {
        this.isLogin = !this.isLogin;
        this.isLoading = false;
      console.log(this.isLogin);
      }, 500);
    });
  }


  customOptions: OwlOptions = {
    loop: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 10,
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
    nav: true,
  };


}
