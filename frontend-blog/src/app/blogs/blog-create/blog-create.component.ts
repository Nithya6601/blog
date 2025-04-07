import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.css'
})
export class BlogCreateComponent {
  blogData = {
    title: '',
    content: ''
  };
  errorMessage = '';

  constructor(private blogService: BlogService, private router: Router) {}

  onSubmit() {
    this.blogService.createBlog(this.blogData).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = 'Failed to create blog.';
        console.error(err);
      }
    });
  }
}
