import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  
  login!: string;
  password!: string;
  
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
    ) {}

  signIn() {
    const user = {
      login: this.login,
      password: this.password,
    }

    if(!user.login) {
      this.toastr.error('Missing login!');
      return false;
    } else if(!user.password) {
      this.toastr.error('Missing password!');
      return false;
    } 

    this.authService.authUser(user).subscribe((data) => {
      if (!data.success) {
        // this.toastr.error(data);
        this.toastr.error("Something went wrong.");

      } else {
        this.toastr.success('You have successfully logged in!');
        this.router.navigate(['/dashboard']);
        this.authService.storeUser(data.token, data.user);
      }
    });

    return false;
  }
}
