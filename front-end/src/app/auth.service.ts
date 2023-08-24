import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!: string | null;
  user: any;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  registerUser(user:any) {
    const url = 'http://localhost:3000/account/reg';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(url, user, { headers: headers })
    .pipe(
        map((response:{
          success: boolean;
          msg: string;
        }) => {
          return response;
        })
      );
  }

  authUser(user:any) {
    const url = 'http://localhost:3000/account/auth';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<boolean>(url, user, { headers: headers })
    .pipe(
        map((response:any) => {
          return response;
        })
      );
  }

  storeUser(token:string, user:any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;

    localStorage.clear();
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !(this.jwtHelper.isTokenExpired());
  }

  createPost(post:any) {
      const url = 'http://localhost:3000/account/dashboard';
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token ? token : '');
      return this.http.post<any>(url, post, { headers: headers })
      .pipe(
          map((response:any) => {
            return response;
          })
        );
    }

    getAllPosts(){
      const url = 'http://localhost:3000';
      return this.http.get<any>(url)
      .pipe(
          map((response) => {
            return response;
          })
        );
    }

    getPostById(id:string) {
      const url = `http://localhost:3000/post/${id}`;
      return this.http.get<any>(url)
      .pipe(
          map((response) => {
            return response;
          })
        );
    }

    deletePost(id:string) {
      const url = `http://localhost:3000/post/${id}`;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders()
      .set('Authorization', token ? token : '');
      return this.http.delete<any>(url, { headers: headers })
      .pipe(
          map((response:any) => {
            return response;
          })
        );
    }
}
