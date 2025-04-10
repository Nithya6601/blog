import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blogs/`;

  constructor(private http: HttpClient) { }

  getBlogs() {
    return this.http.get(this.apiUrl);
  }

  getBlog(id: number) {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  createBlog(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateBlog(id: number, data: any) {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  deleteBlog(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getMyBlogs() {
    return this.http.get(`${this.apiUrl}myblogs/`);
  }
}
