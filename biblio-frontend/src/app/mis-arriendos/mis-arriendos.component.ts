import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-arriendos',
  templateUrl: './mis-arriendos.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./mis-arriendos.component.css']
})
export class MisArriendosComponent implements OnInit {
  arriendos: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getMisArriendos(Number(userId)).subscribe((data) => {
        this.arriendos = data;
      });
    }
  }
}
