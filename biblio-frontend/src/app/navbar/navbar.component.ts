import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private router: Router) {}

    logout(): void {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        this.router.navigate(['/login']);
    }
}