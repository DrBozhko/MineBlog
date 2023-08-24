import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent {

  name!: string;
  login!: string;
  email!: string;
  password!: string;
  
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
    ) {}

  signUp() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password,
    }

    if(!user.name) {
      this.toastr.error('Missing name!');
      return false;
    } else if(!user.login) {
      this.toastr.error('Missing login!');
      return false;
    } else if(!user.email) {
      this.toastr.error('Missing email!');
      return false;
    } else if(this.isValidEmail(user.email)) {
      this.toastr.error('Wrong format of email!');
      return false;
    } else if(!user.password) {
      this.toastr.error('Missing password!');
      return false;
    } 

    this.authService.registerUser(user).subscribe((data) => {
      if (!data.success) {
        this.toastr.error(data.msg);
        this.router.navigate(['/reg']);
      } else {
        this.toastr.success(data.msg);
        this.router.navigate(['/auth']);
      }
    });

    return false;
  }

  private isValidEmail(email:string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !emailPattern.test(email);
  }
  
}
