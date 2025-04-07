import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrl: './my-blog.component.css'
})
export class MyBlogComponent implements OnInit {
  blogs: any[] = [];
  displayedBlogs: any[] = [];
  errorMessage = '';
  currentUsername = '';

  // Pagination config
  currentPage = 1;
  blogsPerPage = 4;

  constructor(private blogService: BlogService, private authService: AuthService) {}

  ngOnInit(): void {
    this.blogService.getMyBlogs().subscribe({
      next: (data: any) => {
        this.blogs = data;
        this.setPage(1); // initialize pagination
        this.authService.getCurrentUser().subscribe(user => {
          this.currentUsername = user.username;
        });
      },
      error: err => {
        this.errorMessage = 'Failed to load your blogs.';
        console.error(err);
      }
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.blogsPerPage;
    const end = start + this.blogsPerPage;
    this.displayedBlogs = this.blogs.slice(start, end);
  }

  deleteBlog(blogId: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(blogId).subscribe({
        next: () => {
          this.blogs = this.blogs.filter(b => b.id !== blogId);
          this.setPage(this.currentPage); // refresh current page after deletion
        },
        error: err => console.error('Failed to delete blog:', err)
      });
    }
  }

  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.blogs.length / this.blogsPerPage) }, (_, i) => i + 1);
  }
}
