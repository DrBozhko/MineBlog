import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  post$!:Observable<any>;
  login!:string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
    ) {}  

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const storedUser = localStorage.getItem("user");
      const user = storedUser !== null ? storedUser : "";
      this.login = JSON.parse(user).login;
    }

    this.post$ = this.route.params
    .pipe(switchMap((params : Params) => {
      return this.authService.getPostById(params['id']);
    }))
  }

  deletePost(id:any) {
    this.authService.deletePost(id).subscribe((data) => {
      if (!data.success) {
        this.toastr.error("Post has not been deleted!");
      } else {
        this.toastr.success("Post has been deleted!");
        this.router.navigate(['/']);
      }
    })
  }
}
