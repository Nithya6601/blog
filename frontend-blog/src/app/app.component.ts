import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-blog';
  isLoggedIn = false;
  isHomePage = false;
  menuOpen = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.isHomePage = event.url === '/';

        // Close mobile menu on route change
        this.menuOpen = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.menuOpen = false; // Close menu on logout
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
