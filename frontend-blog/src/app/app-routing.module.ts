import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';
import { BlogEditComponent } from './blogs/blog-edit/blog-edit.component';
import { MyBlogComponent } from './blogs/my-blog/my-blog.component';
import { authGuard } from './guards/auth.guard';
// import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'create', component: BlogCreateComponent },
  { path: 'edit/:id', component: BlogEditComponent },
  { path: 'my-blogs', component: MyBlogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
