import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Breadcrumb } from '../component/shared/breadcrumb/breadcrumb';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, Breadcrumb, FormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  standalone: true
})
export class Layout {

  quickQuery = '';
  isMenuOpen = false;

  constructor(private router: Router) { }

  goSearch(): void {
    const q = (this.quickQuery || '').trim();
    this.router.navigate(['/busqueda'], { queryParams: { q } });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

}
