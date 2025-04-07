import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];
  pagedBlogs: any[] = [];
  errorMessage = '';
  currentUsername = '';

  currentPage = 1;
  blogsPerPage = 4;
  totalPages = 1;

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUsername = user.username;
        this.loadBlogs();
      },
      error: () => {
        this.currentUsername = '';
        this.loadBlogs();
      }
    });
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data: any) => {
        this.blogs = data;
        this.totalPages = Math.ceil(this.blogs.length / this.blogsPerPage);
        this.setPagedBlogs();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load blogs.';
        console.error(err);
      }
    });
  }

  setPagedBlogs(): void {
    const start = (this.currentPage - 1) * this.blogsPerPage;
    const end = start + this.blogsPerPage;
    this.pagedBlogs = this.blogs.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPagedBlogs();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedBlogs();
    }
  }

  deleteBlog(blogId: number): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(blogId).subscribe({
        next: () => {
          this.blogs = this.blogs.filter(b => b.id !== blogId);
          this.totalPages = Math.ceil(this.blogs.length / this.blogsPerPage);
          if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
          this.setPagedBlogs();
        },
        error: err => console.error('Failed to delete', err)
      });
    }
  }

  handleLoginAlert(): void {
    alert('Please login to read the full blog.');
    this.router.navigate(['/login']);
  }
}
