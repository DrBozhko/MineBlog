import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  category!: string
  title!: string
  photo!: string
  text!: string;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    ) {}

    createPost() {
      const storedUser = localStorage.getItem("user");
      const user = storedUser !== null ? storedUser : "";
      const post = {
        category: this.category,
        title: this.title,
        photo: this.photo,
        text: this.text,
        author: JSON.parse(user).login,
        date: new Date()
      }
      if(!post.category) {
        this.toastr.error('Select a category!');
        return false;
      }
      else if(!post.title) {
        this.toastr.error('Select a title!');
        return false;
      }
      else if(!post.photo) {
        this.toastr.error('Insert a photo!');
        return false;
      }
      else if(!post.text) {
        this.toastr.error('Select a text!');
        return false;
      }
      
      console.log(post)

      this.authService.createPost(post).subscribe((data) => {
        if (!data.success) {
          this.toastr.error(data.msg);
        } else {
          this.toastr.success(data.msg);
          this.router.navigate(['/']);
        }
      });

      return false;
    }
    
}
