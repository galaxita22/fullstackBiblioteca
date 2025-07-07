import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../servicios/api.service';

@Component({
    selector: 'app-mis-multas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mis-multas.component.html',
    styleUrls: ['./mis-multas.component.css']
})
export class MisMultasComponent implements OnInit {
    multas: any[] = [];

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        const userId = localStorage.getItem('userId');
        if (userId) {
            this.apiService.getMisMultas(Number(userId)).subscribe((data) => {
                this.multas = data.filter((m: any) => !m.pagada);
            });
        }
    }
}