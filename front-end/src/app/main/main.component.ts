import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  
  posts: any[] = [];
  category:string = '';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getAllPosts().subscribe(posts => 
      this.posts = posts,
      (err:any) => {},
      () => {
        for (let i = 0; i < this.posts.length; i++) {
          this.posts[i].text = this.posts[i].text.substring(0, 250);
        }
      }
    );
  }

  setCategory(category:string) {
    this.category = category;
  }
}
