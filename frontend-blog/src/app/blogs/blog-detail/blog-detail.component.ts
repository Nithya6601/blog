import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  blog: any;
  blogId!: number;
  currentUsername = '';
  isOwner = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));

    this.authService.getCurrentUser().subscribe( {
      next: user =>{
        this.currentUsername = user.username;

        this.blogService.getBlog(this.blogId).subscribe({
          next: (data) => {
            this.blog = data;
            this.isOwner = this.blog.author === this.currentUsername;
          },
          error: (err) => {
            this.errorMessage = 'Failed to load blog.';
            console.error(err);
          } 
      });
    },
    error: (err) => {
      this.errorMessage = 'Failed to load user.';
      console.error(err)
    }
  });
}

  deleteBlog(): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(this.blogId).subscribe({
        next: () => this.router.navigate(['/my-blogs']),
        error: () => alert('Failed to delete blog.')
      });
    }
  }
}
