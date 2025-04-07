import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrl: './blog-edit.component.css'
})
export class BlogEditComponent implements OnInit {
  blogId!: number;
  blogData = {
    title: '',
    content: ''
  };
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlog(this.blogId).subscribe({
      next: (data: any) => {
        this.blogData.title = data.title;
        this.blogData.content = data.content;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load blog.';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    this.blogService.updateBlog(this.blogId, this.blogData).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => {
        this.errorMessage = 'Failed to update blog.';
        console.error(err);
      }
    });
  }
}
