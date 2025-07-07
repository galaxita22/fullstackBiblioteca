import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../servicios/api.service';

@Component({
    selector: 'app-reporte-admin',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reporte.component.html',
    styleUrls: ['./reporte.component.css']
})
export class ReporteComponent{
    resumen: any = null;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.apiService.obtenerResumen().subscribe((data) => {
            this.resumen = data;
        });
    }
}